/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = (array) => {
    const employee = {
        'firstName': array[0],
        'familyName': array[1],
        'title': array[2],
        'payPerHour': array[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
    return employee
}

const createEmployees = (arrayOfArrays) => {
    return arrayOfArrays.map( (array) => {
        return createEmployeeRecord(array)
    })
}

const createEmployeeRecords = (arrayOfArrays) => {
    return arrayOfArrays.map( (array) => {
        return createEmployeeRecord(array)
    })
}

const createTimeInEvent = function(date) {
    const splitDate = date.split(' ')
    const event = {
        'type': 'TimeIn',
        'hour': parseInt(splitDate[1]),
        'date': splitDate[0]
    }
    this.timeInEvents.push(event);
    return this;
}

const createTimeOutEvent = function(date) {
    const splitDate = date.split(' ')
    const event = {
        'type': 'TimeOut',
        'hour': parseInt(splitDate[1]),
        'date': splitDate[0]
    }
    this.timeOutEvents.push(event);
    return this;
}

const hoursWorkedOnDate = function(date) {
    const timeIn = this.timeInEvents.find( (event) => {
        return event.date === date
    })
    const timeOut = this.timeOutEvents.find( (event) => {
        return event.date === date
    })
    return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = function(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    return hoursWorked * this.payPerHour
}

const calculatePayroll = function(arrayOfEmployees) {
    return arrayOfEmployees.reduce( (memo, employee) => {
        return memo + allWagesFor.call(employee)
    }, 0)
}

const findEmployeebyFirstName = function(collection, firstNameString) {
    return collection.find( (employee) => {
        return employee.firstName === firstNameString
    })
}