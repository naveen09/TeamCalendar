/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of things
var fs = require('fs');
var mysql = require('mysql');
var moment = require('moment');
var pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'uim4z'
});
exports.test = function (req, res) {
    res.json([
        {
            status: 200,
            info: 'OK'
        }
    ]);
};
exports.caList = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var caHolidayList = fs.readFileSync('./data.json', 'utf8');
    res.send(caHolidayList);
}
exports.addEvent = function (req, res) {
    handleDB_Insert(req, res);
    res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
    res.end();
}
exports.deleteEvent = function (req, res) {
    handleDB_delete(req, res);
    res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
    res.end();
}

exports.all = function (req, res) {
    handleDB_Request(req, res, null);
}
exports.event = function (req, res) {
    var pmfKey = req.params.pmfKey;
    if (pmfKey != undefined) {
        console.log('Data requested for ', pmfKey);
        handleDB_Request(req, res, pmfKey);
    } else {
        res.error();
    }
}
function handleDB_delete(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connecting to database"});
            return;
        }
        console.log("Connection to database success:" + connection.threadId);
        var pmf = req.body.pmfkey;
        var title = req.body.title;
        var start = moment(req.body.start).format('YYYY-MM-DD');
        var end = moment(req.body.end).format('YYYY-MM-DD');
        var insertQuery = "DELETE from uim4z_cal where pmfkey='" + pmf + "' AND title='" + title + "' AND start LIKE '" + start + "%' AND end LIKE '" + end + "%'";
        console.log('Delete query ', insertQuery);
        connection.query(insertQuery, function (err, rows) {
            connection.release();
            if (!err) {
                console.log('Inserted row: ', rows);
                res.end();
            }
        });
        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in Deleting to database"});
            return;
        });
    });
}
function handleDB_Insert(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connecting to database"});
            return;
        }
        console.log("Connection to database success:" + connection.threadId);
        var pmf = req.body.pmfkey;
        var name = req.body.username;
        var title = req.body.title;
        var start = req.body.start;
        var end = req.body.end;
        var insertQuery = "INSERT INTO uim4z_cal(pmfkey,name,title,start,end) VALUES('" + pmf + "','" + name + "','" + title + "','" + start + "','" + end + "')";
        console.log('Insert query ', insertQuery);
        connection.query(insertQuery, function (err, rows) {
            connection.release();
            if (!err) {
                console.log('Inserted row: ', rows);
                res.end();
            }
        });
        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in inserting to database"});
            return;
        });
    });
};
function handleDB_Request(req, res, pmfKey) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connecting to database"});
            return;
        }
        console.log("Connection to database success:" + connection.threadId);
        if (pmfKey == null) {
            connection.query("select * from uim4z_cal", function (err, rows) {
                connection.release();
                if (!err) {
                    res.json(rows);
                }
            });
        } else {
            var sql = "select * from uim4z_cal where pmfkey='" + '' + pmfKey + '' + "'";
            console.log('Query formed as ', sql);
            connection.query(sql, function (err, rows) {
                connection.release();
                if (!err) {
                    res.json(rows);
                }
            });
        }

        connection.on('error', function (err) {
            res.write({"code": 100, "status": "Error in connecting to database"});
            return;
        });
    });
};