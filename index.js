/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function(arr) {
    let obj = {};
    obj['firstName'] = arr[0];
    obj['familyName'] = arr[1];
    obj['title'] = arr[2];
    obj['payPerHour'] = arr[3];
    obj['timeInEvents'] = [];
    obj['timeOutEvents'] = [];
    return obj;
}

let createEmployees = function(arr) {
    return arr.map(e => createEmployeeRecord(e));
}

let createTimeInEvent = function(date){
    let timein = {};
    timein['type'] = "TimeIn";
    timein['date'] = date.split(' ')[0];
    timein['hour'] = parseInt(date.split(' ')[1]);
    this.timeInEvents.push(timein);
    return this;
}

let createTimeOutEvent = function(date){
    let timeout = {};
    timeout['type'] = "TimeOut";
    timeout['date'] = date.split(' ')[0];
    timeout['hour'] = parseInt(date.split(' ')[1]);
    this.timeOutEvents.push(timeout);
    return this;
}

let hoursWorkedOnDate = function(date){
    let timein = this.timeInEvents.find(e => e['date'] === date);
    let timeout = this.timeOutEvents.find(e => e['date'] === date);
    return (timeout.hour - timein.hour)/100;
}

let wagesEarnedOnDate = function(date){
    return (hoursWorkedOnDate.call(this, date) * this.payPerHour);
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let calculatePayroll = function(arr) {
    return arr.reduce(((sum, rec) => sum += allWagesFor.call(rec)), 0);
}

let createEmployeeRecords = function(arr) {
    return arr.map(e => createEmployeeRecord(e));
}

let findEmployeebyFirstName = function(arr, name){
    let rx = new RegExp(`^${name}$`, 'i')
    let emp = arr.find(e => e.firstName.match(rx));
    return emp;
}