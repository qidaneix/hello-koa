const {DateTime, Interval} = require('luxon');

module.exports = {
    'POST /display': async (ctx, next) => {
        var staTime = ctx.request.body.staTime || '';
        var timeDur = ctx.request.body.timeDur || '';
        var staTimeFrom = ctx.request.body.staTimeFrom || '';
        var nowTimeFrom = ctx.request.body.nowTimeFrom || '';
        var obj = {staTime, timeDur, nowTime: null, endTime: null, timeLef: null};
        if (staTimeFrom === 'server') {
            obj.staTime = DateTime.local().toISO();
        }
        if (nowTimeFrom === 'server') {
            obj.nowTime = DateTime.local().toISO();
        }
        obj.endTime = DateTime.fromISO(staTime).plus({days: parseInt(timeDur)}).toISO();
        if (obj.nowTime) {
            obj.timeLef = Interval.fromDateTimes(DateTime.fromISO(obj.nowTime), DateTime.fromISO(obj.endTime)).toDuration().toObject().milliseconds;
        }
        console.log(obj);
        ctx.render('diaplay.html', obj);
    }
};