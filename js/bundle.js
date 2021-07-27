(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var l = (n[o] = { exports: {} });
      t[o][0].call(
        l.exports,
        function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function (require, module, exports) {
        var spotController = require("./ng-controller");
        var config = require("./ng-config");
        var compiler = require("./ng-dir-compile");
        var budgetComponent = require("./ng-dir-budget");
        var docValues = require("./ng-fact-docValues");
        var otherComponent = require("./ng-dir-other");
        var ps = require("./ng-dir-peopleSoft");
        var setup = require("./ng-dir-setup");
        angular
          .module("spotSidebar", ["ngMaterial", "ngMessages"])
          .config(config)
          .controller("spotCtrl", spotController)
          .factory("docValues", docValues)
          .directive("compile", compiler)
          .directive("budgetCont", budgetComponent)
          .directive("psCont", ps)
          .directive("otherCont", otherComponent)
          .directive("setupSidebar", setup);
      },
      {
        "./ng-config": 2,
        "./ng-controller": 3,
        "./ng-dir-budget": 4,
        "./ng-dir-compile": 5,
        "./ng-dir-other": 6,
        "./ng-dir-peopleSoft": 7,
        "./ng-dir-setup": 8,
        "./ng-fact-docValues": 9,
      },
    ],
    2: [
      function (require, module, exports) {
        module.exports = function ($mdThemingProvider) {
          $mdThemingProvider
            .theme("psTheme")
            .primaryPalette("green", {
              default: "600",
              "hue-1": "100",
              "hue-2": "400",
              "hue-3": "A100",
            });
          $mdThemingProvider.theme("studentTheme").primaryPalette("blue-grey");
          $mdThemingProvider
            .theme("setupTheme")
            .primaryPalette("deep-orange")
            .accentPalette("orange");
        };
      },
      {},
    ],
    3: [
      function (require, module, exports) {
        module.exports = [
          "$scope",
          function ($scope) {
            var tabs = [
              {
                title: "Budget",
                sectionHdr: "Budget Tools",
                mdTheme: "",
                menu: "budgetMenu",
                menuSubhead: "Budget Tools",
                tools: [
                  { title: "Get MPD Transactions", value: "getMPDTrans" },
                  { title: "Insert Line", value: "InsertLine" },
                  { title: "Print Your Advance", value: "advLedger" },
                ],
                content:
                  '<budget-cont current-function="budgetFunction" run="runFunction" break-even="breakEvenNum"></budget-cont>',
              },
              {
                title: "PS",
                sectionHdr: "PeopleSoft Import",
                mdTheme: "psTheme",
                menuSubhead: "PeopleSoft Tools",
                tools: [{ title: "Import from PeopleSoft", value: "psQuery" }],
                content:
                  '<ps-cont current-function="psFunction" run="runFunction"></ps-cont>',
              },
              {
                title: "Other",
                sectionHdr: "Other SPOT Tools",
                mdTheme: "studentTheme",
                menu: "otherMenu",
                menuSubhead: "Other Tools",
                tools: [
                  { title: "Print Per Diem Form", value: "printPerDiem" },
                  { title: "Send Student SPOT document", value: "studentOPD" },
                  {
                    title: "Update Accepted Students",
                    value: "acceptedStudents",
                  },
                ],
                content:
                  '<other-cont current-function="otherFunction" run="runFunction"></other-cont>',
              },
            ];
            $scope.loading = false;
            $scope.serverLoading = false;
            $scope.error = false;
            $scope.menuIcon = { name: "menu", color: "" };
            $scope.showMenu = function (funcMenu) {
              if ($scope.openMenu == funcMenu) {
                $scope.openMenu = null;
                $scope.menuIcon.name = "menu";
              } else {
                $scope.openMenu = funcMenu;
                $scope.menuIcon.name = "clear";
              }
            };
            $scope.tabs = tabs;
            $scope.getContent = function (val, title) {
              $scope.loading = true;
              $scope.openMenu = null;
              $scope.menuIcon.name = "menu";
              if (title == "Budget") {
                switch (val) {
                  case "advLedger":
                    $scope.budgetFunction = {
                      title: "Print Your Advance",
                      desc:
                        "Print your advance as well as your Operating Reimbursement Form to send to your region's finance professional.",
                    };
                    break;
                  case "breakEven":
                    $scope.budgetFunction = {
                      title: "Calculate Break-Even Number",
                      desc:
                        "Calculate the number of students needed for the summer mission to break even based on the current budget.",
                    };
                    break;
                  case "getMPDTrans":
                    $scope.budgetFunction = {
                      title: "Get MPD Transactions",
                      desc: "Get new transactions from give.cru.org.",
                    };
                    break;
                  case "InsertLine":
                    $scope.budgetFunction = {
                      title: "Insert Line",
                      desc:
                        "Adds a row to any sheet in SPOT below the cell selected. It copies all the formating and formulas from the selected line.",
                    };
                    break;
                }
              } else if (title == "Other") {
                switch (val) {
                  case "printPerDiem":
                    $scope.otherFunction = {
                      title: "Print Per Diem",
                      desc:
                        "Run this function to generate a new per diem form with your accepted students already entered. Your per diem form will be generated in a new sheet and be visible in the sheets bar below.",
                    };
                    break;
                  case "studentOPD":
                    $scope.otherFunction = {
                      title: "Student OPD",
                      desc:
                        "Create a student budget document and link data from SPOT. The new student budget document will be shared with the email provided below.",
                    };
                    break;
                  case "acceptedStudents":
                    $scope.otherFunction = {
                      title: "Update Accepted Students",
                      desc:
                        "Update your accepted students from the Summer Mission App.",
                    };
                    break;
                }
              }
              $scope.loading = false;
              $scope.$apply();
            };
            function success() {
              $scope.serverLoading = false;
              $scope.$apply();
            }
            function breakEvenSuccess(value) {
              $scope.serverLoading = false;
              $scope.breakEvenNum = value;
              $scope.$apply();
            }
            function error(msg) {
              $scope.errorMsg = msg.name;
              $scope.serverLoading = false;
              $scope.error = true;
              $scope.$apply();
            }
            $scope.removeError = function () {
              $scope.error = false;
            };
            $scope.runFunction = function (func, options) {
              $scope.serverLoading = true;
              if (func == "Update Accepted Students") {
                return google.script.run
                  .withSuccessHandler(success)
                  .withFailureHandler(error)
                  .getAcceptedStudents();
              } else if (func == "Calculate Break-Even Number") {
                return google.script.run
                  .withSuccessHandler(breakEvenSuccess)
                  .withFailureHandler(error)
                  .breakEven();
              } else if (func == "Get MPD Transactions") {
                return google.script.run
                  .withSuccessHandler(success)
                  .withFailureHandler(error)
                  .getMPDTransactions();
              } else if (func == "Insert Line") {
                return google.script.run
                  .withSuccessHandler(success)
                  .withFailureHandler(error)
                  .InsertLine(options);
              } else if (func == "Print Your Advance") {
                return google.script.run
                  .withSuccessHandler(success)
                  .withFailureHandler(error)
                  .printDialog(options);
              } else if (func == "Print Per Diem") {
                return google.script.run
                  .withSuccessHandler(success)
                  .withFailureHandler(error)
                  .printPerDiem(options);
              } else if (func == "Restore Formulas") {
                return google.script.run
                  .withSuccessHandler(success)
                  .withFailureHandler(error)
                  .restoreFormulas();
              } else if (func == "Budget Categories") {
                return google.script.run
                  .withSuccessHandler(success)
                  .withFailureHandler(error)
                  .updateValidations();
              } else if (func == "Import PeopleSoft") {
                return google.script.run
                  .withSuccessHandler(success)
                  .withFailureHandler(error)
                  .pullPSHR(options);
              } else if (func == "Student OPD") {
                return google.script.run
                  .withSuccessHandler(success)
                  .withFailureHandler(error)
                  .prepStudentOPD(options);
              } else {
                var msg = { name: "We did not find a function to run" };
                return error(msg);
              }
            };
          },
        ];
      },
      {},
    ],
    4: [
      function (require, module, exports) {
        module.exports = [
          "$mdSidenav",
          "$sce",
          "docValues",
          function ($mdSidenav, $sce, docValues) {
            var link = function (scope, element, attrs) {
              scope.icons = {
                settings: { name: "settings", color: "#fff" },
                hideHdr: { name: "remove_red_eye", color: "rgb(194,214,155)" },
                hideCol: { name: "remove_red_eye", color: "rgb(217,149,148)" },
                students: { name: "face", color: "#333" },
              };
              scope.InsertLine = false;
              scope.advanceForm = false;
              scope.breakEvenFunc = false;
              scope.functionCont = false;
              scope.minBudgetHdr = false;
              scope.minPayCol = false;
              scope.budgetContent =
                "To get started select a section in the top tab bar corestponding with the tool you want to use. \n         \n Budget Tools pertain primarily with the budget sheet and contain the Insert Line, Get MPD Transactions, Print Adv Ledger and Restore Forumla tools. \n         \n The PS Tools allow you to import PeopleSoft content. \n         \n The Other Tools allow you to Print your per diem form, create SPOT document for a student Ops Director and Update your accepted students.";
              docValues.getSetup().then(function (data) {
                if (data.summerMission) {
                  var sm = data.summerMission;
                  if (sm.advance) {
                    scope.advance = sm.advance;
                  }
                } else {
                  scope.advance = {};
                }
              });
              scope.$watch(
                "currentFunc",
                function (newVal, oldVal) {
                  if (!newVal) return;
                  if (newVal.title == "Calculate Break-Even Number") {
                    scope.breakEvenFunc = true;
                  } else {
                    scope.breakEvenFunc = false;
                  }
                  if (newVal.title == "Insert Line") {
                    scope.InsertLine = !scope.InsertLine;
                  } else {
                    scope.InsertLine = false;
                  }
                  if (newVal.title == "Print Your Advance") {
                    scope.advanceForm = !scope.advanceForm;
                  } else {
                    scope.advanceForm = false;
                  }
                  scope.funcContent = true;
                },
                true
              );
              scope.runFunction = function (value) {
                if (value == "Insert Line") {
                  var options = scope.numberOfLines;
                } else if (value == "Print Your Advance") {
                  var options = scope.advance;
                }
                scope.run()(value, options);
              };
              scope.toggleRight = buildToggler("setup");
              function buildToggler(navID) {
                return function () {
                  $mdSidenav(navID).toggle();
                };
              }
              scope.setup = {
                selectedMode: "md-fling",
                selectedDirection: "up",
                isOpen: false,
                sidebar: "<setup-sidebar></setup-sidebar>",
              };
              scope.toggleBudget = function (toggle) {
                var toggleObj = {};
                toggleObj.name = toggle;
                if (toggle == "budgetHdr") {
                  var val = (scope.minBudgetHdr = !scope.minBudgetHdr);
                  toggleObj.value = val;
                }
                if (toggle == "payCol") {
                  var val = (scope.minPayCol = !scope.minPayCol);
                  toggleObj.value = val;
                }
                google.script.run.minBudget(toggleObj);
              };
              scope.showHideSheet = function (sheet) {
                google.script.run.showHideSheet(sheet);
              };
            };
            return {
              restrict: "E",
              scope: {
                currentFunc: "=currentFunction",
                run: "&",
                breakEven: "=",
              },
              link: link,
              templateUrl: $sce.trustAsResourceUrl(
                "https://cdn.jsdelivr.net/gh/ruehsCru/SPOT-scripts@master/views/budget-tpl.html"
              ),
            };
          },
        ];
      },
      {},
    ],
    5: [
      function (require, module, exports) {
        module.exports = [
          "$compile",
          function ($compile) {
            return function (scope, element, attrs) {
              scope.$watch(
                function (scope) {
                  return scope.$eval(attrs.compile);
                },
                function (value) {
                  element.html(value);
                  $compile(element.contents())(scope);
                }
              );
            };
          },
        ];
      },
      {},
    ],
    6: [
      function (require, module, exports) {
        module.exports = [
          "$filter",
          "$sce",
          function ($filter, $sce) {
            var link = function (scope, element, attrs) {
              scope.iconData = { email: { name: "email", color: "#607D8B" } };
              scope.showAmount = false;
              scope.showDate = false;
              scope.perDiemAmount;
              scope.perDiemDate;
              scope.perDiemType = "students";
              scope.studentMail = false;
              scope.printPerDiem = false;
              scope.$watch(
                "currentFunc",
                function (newVal, oldVal) {
                  if (!newVal) return;
                  if (newVal.title == "Student OPD") {
                    scope.studentMail = true;
                    scope.printPerDiem = false;
                  } else if (newVal.title == "Print Per Diem") {
                    scope.printPerDiem = true;
                    scope.studentMail = false;
                  } else {
                    scope.studentMail = false;
                    scope.printPerDiem = false;
                  }
                  scope.funcContent = true;
                },
                true
              );
              scope.runFunction = function (value) {
                if (scope.studentMail == true) {
                  var email = scope.student.email;
                  scope.run()(value, email);
                } else if (scope.printPerDiem == true) {
                  var options = {
                    amount: null,
                    date: null,
                    type: scope.perDiemType,
                  };
                  if (scope.showDate && scope.showAmount) {
                    options.amount = $filter("currency")(
                      scope.perDiemAmount,
                      "$",
                      2
                    );
                    options.date = $filter("date")(
                      scope.perDiemDate,
                      "MM/dd/yyyy"
                    );
                    scope.run()(value, options);
                  } else if (scope.showDate) {
                    options.date = $filter("date")(
                      scope.perDiemDate,
                      "MM/dd/yyyy"
                    );
                    scope.run()(value, options);
                  } else if (scope.showAmount) {
                    options.amount = $filter("currency")(
                      scope.perDiemAmount,
                      "$",
                      2
                    );
                    scope.run()(value, options);
                  } else {
                    scope.run()(value, options);
                  }
                } else {
                  scope.run()(value);
                }
              };
            };
            return {
              restrict: "E",
              scope: { currentFunc: "=currentFunction", run: "&" },
              link: link,
              templateUrl: $sce.trustAsResourceUrl(
                "https://cdn.jsdelivr.net/gh/ruehsCru/SPOT-scripts@master/views/other-tpl.html"
              ),
            };
          },
        ];
      },
      {},
    ],
    7: [
      function (require, module, exports) {
        module.exports = [
          "$filter",
          "$sce",
          function ($filter, $sce) {
            var link = function (scope, element, attrs) {
              scope.psFunc = {
                title: "Import Peoplesoft Transactions",
                description:
                  "Import Peoplesoft transactions from give.cru.org.",
                func: "Import PeopleSoft",
              };
              scope.runFunction = function (value) {
                if ((scope.psQuery = true)) {
                  var queryDates = scope.query,
                    psDates = [];
                  for (var i in queryDates) {
                    var filteredDate = $filter("date")(
                      queryDates[i],
                      "yyyyMMdd"
                    );
                    psDates.push(filteredDate);
                  }
                  scope.run()(value, psDates);
                } else {
                  scope.run()(value);
                }
              };
            };
            return {
              restrict: "E",
              scope: { currentFunc: "=currentFunction", run: "&" },
              link: link,
              templateUrl: $sce.trustAsResourceUrl(
                "https://cdn.jsdelivr.net/gh/ruehsCru/SPOT-scripts@master/views/peopleSoft-tpl.html"
              ),
            };
          },
        ];
      },
      {},
    ],
    8: [
      function (require, module, exports) {
        module.exports = [
          "$mdSidenav",
          "$mdDialog",
          "$filter",
          "$sce",
          "docValues",
          function ($mdSidenav, $mdDialog, $filter, $sce, docValues) {
            var link = function (scope, element, attrs) {
              scope.selectedIndex = 0;
              scope.saveInfo = false;
              docValues.getSetup().then(function (data) {
                if (data.staffInfo) {
                  scope.staffInfo = data.staffInfo;
                  if (!data.summerMission) {
                    $mdSidenav("setup").toggle();
                  } else {
                    scope.summerMission = data.summerMission;
                  }
                } else {
                  $mdSidenav("setup").toggle();
                }
              });
              scope.close = function () {
                $mdSidenav("setup").close();
              };
              scope.budgetOpt = [
                { name: "Stateside" },
                { name: "Global Missions" },
              ];
              scope.confirmBudget = function (obj) {
                var confirm = $mdDialog
                  .confirm()
                  .parent(angular.element(document.body))
                  .title("You chose to create a " + obj.budget + ".")
                  .content("Please verify that this is correct.")
                  .ariaLabel("SPOT Budget")
                  .ok("Yes.")
                  .cancel("Change it.");
                var loading = {
                  templateUrl: $sce.trustAsResourceUrl(
                    "https://cdn.jsdelivr.net/gh/ruehsCru/SPOT-scripts@master/views/build-dialog-tpl.html"
                  ),
                  parent: angular.element(document.body),
                };
                $mdDialog.show(confirm).then(function () {
                  scope.getProjectId(obj);
                  $mdDialog.show(loading);
                }, "");
              };
              scope.getProjectId = function (obj) {
                if (obj.startDate) {
                  var filteredStartDate = $filter("date")(
                    obj.startDate,
                    "MM/dd/yyyy"
                  );
                  obj.startDate = filteredStartDate;
                }
                if (obj.endDate) {
                  var filteredEndDate = $filter("date")(
                    obj.endDate,
                    "MM/dd/yyyy"
                  );
                  obj.endDate = filteredEndDate;
                }
                var cf = obj.chartfield;
                cf.businessUnit = $filter("uppercase")(cf.businessUnit);
                cf.operatingUnit = $filter("uppercase")(cf.operatingUnit);
                cf.deptID = $filter("uppercase")(cf.deptID);
                google.script.run
                  .withSuccessHandler(setupSaved)
                  .withFailureHandler(error)
                  .saveSM(obj);
              };
              function setupSaved(index) {
                if (index == 0) {
                  var checkChartfield = $mdDialog
                    .confirm()
                    .parent(angular.element(document.body))
                    .title("We could not find your project")
                    .content(
                      "Please verify that you entered the correct chartfield."
                    )
                    .ok("Ok.");
                  $mdDialog.hide().then(function () {
                    $mdDialog.show(checkChartfield);
                  }, "");
                } else if (index == 2) {
                  $mdDialog.hide().then(function () {
                    $mdSidenav("setup").close();
                    saveDialog();
                  }, "");
                } else if (index == 3) {
                  $mdDialog.hide().then(function () {
                    $mdSidenav("setup").close();
                  }, "");
                } else {
                  scope.selectedIndex = index;
                }
                scope.saveInfo = false;
                scope.$apply();
                function saveDialog($event) {
                  var parentEl = angular.element(document.body);
                  $mdDialog.show({
                    parent: parentEl,
                    targetEvent: $event,
                    templateUrl: $sce.trustAsResourceUrl(
                      "https://cdn.jsdelivr.net/gh/ruehsCru/SPOT-scripts@master/views/rename-dialog-tpl.html"
                    ),
                    locals: { spotTitle: scope.spotTitle },
                    controller: SaveController,
                  });
                  function SaveController(scope, $mdDialog) {
                    scope.saveDialog = function () {
                      $mdDialog.hide();
                      google.script.run.rename(scope.spotTitle);
                    };
                  }
                }
              }
              function error() {}
              scope.saveStaffInfo = function (obj) {
                scope.saveInfo = true;
                if (obj.account.length < 9) {
                  if (obj.account.length < 8) {
                    obj.account = "00" + obj.account;
                  } else {
                    obj.account = "0" + obj.account;
                  }
                }
                google.script.run
                  .withSuccessHandler(setupSaved)
                  .withFailureHandler(error)
                  .saveStaffSetup(obj);
              };
            };
            return {
              restrict: "E",
              link: link,
              templateUrl: $sce.trustAsResourceUrl(
                "https://cdn.jsdelivr.net/gh/ruehsCru/SPOT-scripts@master/views/setup-tpl.html"
              ),
            };
          },
        ];
      },
      {},
    ],
    9: [
      function (require, module, exports) {
        module.exports = function ($q, $timeout) {
          var getSetup = function () {
            var deferred = $q.defer(),
              setupData = {};
            google.script.run.withSuccessHandler(setupValues).getSetup();
            function setupValues(data) {
              if (Object.keys(data).length > 0) {
                setupData.staffInfo = data.staffInfo;
                if (data.sm) {
                  data.sm.startDate = new Date(data.sm.startDate);
                  data.sm.endDate = new Date(data.sm.endDate);
                  setupData.summerMission = data.sm;
                }
              }
            }
            $timeout(function () {
              deferred.resolve(setupData);
            }, 2e3);
            return deferred.promise;
          };
          return { getSetup: getSetup };
        };
      },
      {},
    ],
  },
  {},
  [1]
);
