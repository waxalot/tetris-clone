/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var game_1 = __webpack_require__(1);
	var stopBtn = document.getElementById('stop');
	stopBtn.addEventListener('click', function () {
	    game.stop();
	});
	var game = new game_1.Game();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var stone_1 = __webpack_require__(2);
	var stones_1 = __webpack_require__(3);
	var constants_1 = __webpack_require__(6);
	var Game = (function () {
	    function Game() {
	        var _this = this;
	        this.levelSpeedMS = 1000; // Smaller is faster is harder
	        this.handleKeyDown = function (e) {
	            switch (e.keyCode) {
	                case 37: {
	                    // Left
	                    _this.moveStoneLeft(_this.currentStone);
	                    break;
	                }
	                case 38: {
	                    // Up
	                    _this.instantDown(_this.currentStone);
	                    break;
	                }
	                case 39: {
	                    // Right
	                    _this.moveStoneRight(_this.currentStone);
	                    break;
	                }
	                case 40: {
	                    // Down
	                    _this.moveStoneDown(_this.currentStone);
	                    break;
	                }
	                case 65: {
	                    // Rotate CW
	                    if (_this.currentStone) {
	                        _this.currentStone.rotateCCW();
	                    }
	                    break;
	                }
	                case 68: {
	                    // Rotate CCW
	                    if (_this.currentStone) {
	                        _this.currentStone.rotateCW();
	                    }
	                    break;
	                }
	            }
	            e.preventDefault();
	            e.stopPropagation();
	        };
	        this.instantDown = function (stone) {
	            // TODO
	        };
	        this.run = function () {
	            _this.update();
	            _this.draw();
	        };
	        this.update = function () {
	            // Calculate delta time in milliseconds
	            var dt = Date.now() - _this.lastUpdateTime;
	            _this.tickTimer -= dt;
	            if (_this.tickTimer <= 0) {
	                // A game step can be performed
	                _this.performWorldStep();
	                _this.tickTimer = _this.levelSpeedMS;
	            }
	            _this.lastUpdateTime = Date.now();
	        };
	        this.performWorldStep = function () {
	            _this.moveStoneDown(_this.currentStone);
	        };
	        this.doesPositionCollide = function (x, y) {
	            return _this.board[x][y] != 0 /* undefined */;
	        };
	        this.draw = function () {
	            _this.clear();
	            _this.drawBoard();
	            if (_this.currentStone) {
	                _this.currentStone.draw(_this.ctx);
	            }
	        };
	        this.clear = function () {
	            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
	        };
	        this.freezeStone = function () {
	            _this.freezeCurrentStone();
	            _this.checkForFullLines();
	            _this.createStone();
	        };
	        this.freezeCurrentStone = function () {
	            for (var i = 0; i < _this.currentStone.positions.length; i++) {
	                _this.board[_this.currentStone.positions[i].x][_this.currentStone.positions[i].y] = _this.currentStone.stoneType;
	            }
	        };
	        this.checkForFullLines = function () {
	            var fullLinesIndices = new Array();
	            for (var j = 0; j < constants_1.Constants.BOARD_HEIGHT; j++) {
	                var isFullLine = true;
	                for (var i = 0; i < constants_1.Constants.BOARD_WIDTH; i++) {
	                    if (_this.board[i][j] === 0 /* undefined */) {
	                        isFullLine = false;
	                        break;
	                    }
	                }
	                if (isFullLine) {
	                    fullLinesIndices.push(j);
	                }
	            }
	            _this.removeLines(fullLinesIndices);
	        };
	        this.copyLine = function (sourceIndex, targetIndex) {
	            for (var i = 0; i < constants_1.Constants.BOARD_WIDTH; i++) {
	                _this.board[i][targetIndex] = _this.board[i][sourceIndex];
	            }
	        };
	        this.removeLines = function (indices) {
	            if (!indices || indices.length === 0) {
	                return;
	            }
	            // Two pointers, to select the source and target lines for copying values.
	            var targetIndex;
	            var sourceIndex;
	            var offset = 1;
	            // Remove lines by overwrite lines which should be removed with valid lines.
	            // Start at the last line which should be deleted and go up from there...
	            for (targetIndex = indices[indices.length - 1]; targetIndex >= 0; targetIndex--) {
	                // Target line should be removed
	                for (sourceIndex = targetIndex - offset; sourceIndex >= 0; sourceIndex--) {
	                    if (indices.indexOf(sourceIndex) === -1) {
	                        // A valid source line was found.
	                        _this.copyLine(sourceIndex, targetIndex);
	                        break;
	                    }
	                    else {
	                        offset++;
	                    }
	                }
	            }
	        };
	        this.drawBoard = function () {
	            for (var i = 0; i < constants_1.Constants.BOARD_WIDTH; i++) {
	                for (var j = 0; j < constants_1.Constants.BOARD_HEIGHT; j++) {
	                    var stoneType = _this.board[i][j];
	                    if (stoneType !== 0 /* undefined */) {
	                        stone_1.Stone.drawBlockByType(_this.ctx, stoneType, i, j);
	                    }
	                }
	            }
	        };
	        this.drawBlock = function (x, y) {
	            _this.ctx.beginPath();
	            _this.ctx.lineWidth = 2;
	            _this.ctx.fillRect(x * constants_1.Constants.BLOCK_UNIT_SIZE, y * constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE);
	        };
	        this.canvas = document.getElementById('board');
	        this.ctx = this.canvas.getContext('2d');
	        var gameContainer = document.getElementById('gameContainer');
	        gameContainer.addEventListener("keydown", this.handleKeyDown);
	        this.initBoard();
	        this.createStone();
	        this.initGameLoop();
	    }
	    Game.prototype.initGameLoop = function () {
	        this.lastUpdateTime = Date.now();
	        this.tickTimer = this.levelSpeedMS;
	        var fps = 60;
	        // Start the game loop
	        this.gameLoopIntervalId = setInterval(this.run, 1000 / fps);
	    };
	    Game.prototype.stop = function () {
	        this.levelSpeedMS = 10000000;
	        //clearInterval(this.gameLoopIntervalId);
	        //this.clear();
	    };
	    Game.prototype.createStone = function () {
	        var newStoneType;
	        newStoneType = Math.floor(Math.random() * 7) + 1;
	        switch (newStoneType) {
	            case 1 /* i */: {
	                this.currentStone = new stones_1.I();
	                break;
	            }
	            case 2 /* j */: {
	                this.currentStone = new stones_1.J();
	                break;
	            }
	            case 3 /* l */: {
	                this.currentStone = new stones_1.L();
	                break;
	            }
	            case 4 /* o */: {
	                this.currentStone = new stones_1.O();
	                break;
	            }
	            case 5 /* s */: {
	                this.currentStone = new stones_1.S();
	                break;
	            }
	            case 6 /* t */: {
	                this.currentStone = new stones_1.T();
	                break;
	            }
	            case 7 /* z */: {
	                this.currentStone = new stones_1.Z();
	                break;
	            }
	        }
	    };
	    Game.prototype.moveStoneLeft = function (stone) {
	        if (!stone) {
	            return;
	        }
	        // Check if the stone can be moved left
	        for (var i = 0; i < stone.positions.length; i++) {
	            if (stone.positions[i].x - 1 < 0 || this.doesPositionCollide(stone.positions[i].x - 1, stone.positions[i].y)) {
	                return;
	            }
	        }
	        // Move the stone left
	        for (var i = 0; i < stone.positions.length; i++) {
	            stone.positions[i].x--;
	        }
	    };
	    Game.prototype.moveStoneRight = function (stone) {
	        if (!stone) {
	            return;
	        }
	        // Check if the stone can be moved right
	        for (var i = 0; i < stone.positions.length; i++) {
	            if (stone.positions[i].x + 1 >= constants_1.Constants.BOARD_WIDTH || this.doesPositionCollide(stone.positions[i].x + 1, stone.positions[i].y)) {
	                return;
	            }
	        }
	        // Move the stone left
	        for (var i = 0; i < stone.positions.length; i++) {
	            stone.positions[i].x++;
	        }
	    };
	    Game.prototype.moveStoneDown = function (stone) {
	        if (!stone) {
	            return;
	        }
	        // Check if the stone can be moved down
	        for (var i = 0; i < stone.positions.length; i++) {
	            if (stone.positions[i].y + 1 >= constants_1.Constants.BOARD_HEIGHT || this.doesPositionCollide(stone.positions[i].x, stone.positions[i].y + 1)) {
	                this.freezeStone();
	                return;
	            }
	        }
	        // Move the stone down
	        for (var i = 0; i < stone.positions.length; i++) {
	            stone.positions[i].y++;
	        }
	    };
	    Game.prototype.initBoard = function () {
	        // Init model
	        this.board = [];
	        for (var i = 0; i < constants_1.Constants.BOARD_WIDTH; i++) {
	            this.board[i] = [];
	            for (var j = 0; j < constants_1.Constants.BOARD_HEIGHT; j++) {
	                this.board[i][j] = 0 /* undefined */;
	            }
	        }
	        // Init Canvas
	        this.canvas.width = constants_1.Constants.BOARD_WIDTH * constants_1.Constants.BLOCK_UNIT_SIZE;
	        this.canvas.height = constants_1.Constants.BOARD_HEIGHT * constants_1.Constants.BLOCK_UNIT_SIZE;
	    };
	    return Game;
	}());
	exports.Game = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var stones_1 = __webpack_require__(3);
	var Stone = (function () {
	    function Stone(positions, stoneType) {
	        var _this = this;
	        this.draw = function (ctx) {
	            _this.positions.forEach(function (position) {
	                Stone.drawBlockByType(ctx, _this.stoneType, position.x, position.y);
	            });
	        };
	        this.positions = positions;
	        this.stoneType = stoneType;
	        this.positionsCount = this.positions.length;
	        this.pivotPosition = this.getPivotPosition();
	        this.lastRotationDirection = 0 /* undefined */;
	    }
	    Stone.drawBlockByType = function (ctx, stoneType, x, y) {
	        switch (stoneType) {
	            case 1 /* i */: {
	                stones_1.I.drawBlock(ctx, x, y);
	                break;
	            }
	            case 2 /* j */: {
	                stones_1.J.drawBlock(ctx, x, y);
	                break;
	            }
	            case 3 /* l */: {
	                stones_1.L.drawBlock(ctx, x, y);
	                break;
	            }
	            case 4 /* o */: {
	                stones_1.O.drawBlock(ctx, x, y);
	                break;
	            }
	            case 5 /* s */: {
	                stones_1.S.drawBlock(ctx, x, y);
	                break;
	            }
	            case 6 /* t */: {
	                stones_1.T.drawBlock(ctx, x, y);
	                break;
	            }
	            case 7 /* z */: {
	                stones_1.Z.drawBlock(ctx, x, y);
	                break;
	            }
	        }
	    };
	    Stone.prototype.rotateCCW = function () {
	        if (!this.positions || this.positions.length === 0 || !this.pivotPosition) {
	            return;
	        }
	        for (var i = 0; i < this.positionsCount; i++) {
	            // Calculate relative offset from the current position to the pivot position.
	            var vRelX = this.positions[i].x - this.pivotPosition.x;
	            var vRelY = this.positions[i].y - this.pivotPosition.y;
	            // Multiply the relative vector with the rotation matrix.
	            // [ 0 -1 ]
	            // [ 1  0 ]
	            var vTransformedX = vRelY * (-1);
	            var vTransformedY = vRelX;
	            // Now update the position with the newly calculated position info.
	            this.positions[i].x = this.pivotPosition.x + vTransformedX;
	            this.positions[i].y = this.pivotPosition.y + vTransformedY;
	        }
	        this.lastRotationDirection = 2 /* ccw */;
	    };
	    Stone.prototype.rotateCW = function () {
	        if (!this.positions || this.positions.length === 0 || !this.pivotPosition) {
	            return;
	        }
	        for (var i = 0; i < this.positionsCount; i++) {
	            // Calculate relative offset from the current position to the pivot position.
	            var vRelX = this.positions[i].x - this.pivotPosition.x;
	            var vRelY = this.positions[i].y - this.pivotPosition.y;
	            // Multiply the relative vector with the rotation matrix.
	            // [ 0  1 ]
	            // [-1  0 ]
	            var vTransformedX = vRelY;
	            var vTransformedY = vRelX * (-1);
	            // Now update the position with the newly calculated position info.
	            this.positions[i].x = this.pivotPosition.x + vTransformedX;
	            this.positions[i].y = this.pivotPosition.y + vTransformedY;
	        }
	        this.lastRotationDirection = 1 /* cw */;
	    };
	    Stone.prototype.getPivotPosition = function () {
	        var possiblePivotPositions = this.positions.filter(function (stonePosition) {
	            return stonePosition.isPivot;
	        });
	        if (possiblePivotPositions && possiblePivotPositions.length > 0) {
	            return possiblePivotPositions[0];
	        }
	        return null;
	    };
	    return Stone;
	}());
	exports.Stone = Stone;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var i_1 = __webpack_require__(4);
	exports.I = i_1.I;
	var j_1 = __webpack_require__(7);
	exports.J = j_1.J;
	var l_1 = __webpack_require__(8);
	exports.L = l_1.L;
	var o_1 = __webpack_require__(9);
	exports.O = o_1.O;
	var s_1 = __webpack_require__(10);
	exports.S = s_1.S;
	var t_1 = __webpack_require__(11);
	exports.T = t_1.T;
	var z_1 = __webpack_require__(12);
	exports.Z = z_1.Z;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var stone_1 = __webpack_require__(2);
	var stonePosition_1 = __webpack_require__(5);
	var constants_1 = __webpack_require__(6);
	var I = (function (_super) {
	    __extends(I, _super);
	    function I() {
	        return _super.call(this, [new stonePosition_1.StonePosition(3, 0), new stonePosition_1.StonePosition(4, 0, true), new stonePosition_1.StonePosition(5, 0), new stonePosition_1.StonePosition(6, 0)], 1 /* i */) || this;
	    }
	    I.prototype.rotateCCW = function () {
	        if (this.lastRotationDirection === 0 /* undefined */ || this.lastRotationDirection === 2 /* ccw */) {
	            _super.prototype.rotateCW.call(this);
	        }
	        else {
	            _super.prototype.rotateCCW.call(this);
	        }
	    };
	    I.prototype.rotateCW = function () {
	        if (this.lastRotationDirection === 0 /* undefined */ || this.lastRotationDirection === 2 /* ccw */) {
	            _super.prototype.rotateCW.call(this);
	        }
	        else {
	            _super.prototype.rotateCCW.call(this);
	        }
	    };
	    return I;
	}(stone_1.Stone));
	I.drawBlock = function (ctx, x, y) {
	    ctx.beginPath();
	    ctx.lineWidth = 2;
	    ctx.fillRect(x * constants_1.Constants.BLOCK_UNIT_SIZE, y * constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE);
	};
	exports.I = I;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var StonePosition = (function () {
	    function StonePosition(x, y, isPivot) {
	        if (isPivot === void 0) { isPivot = false; }
	        this.x = x;
	        this.y = y;
	        this.isPivot = isPivot;
	    }
	    return StonePosition;
	}());
	exports.StonePosition = StonePosition;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Constants = (function () {
	    function Constants() {
	    }
	    return Constants;
	}());
	Constants.BOARD_WIDTH = 10;
	Constants.BOARD_HEIGHT = 17;
	Constants.BLOCK_UNIT_SIZE = 30;
	exports.Constants = Constants;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var stone_1 = __webpack_require__(2);
	var stonePosition_1 = __webpack_require__(5);
	var constants_1 = __webpack_require__(6);
	var J = (function (_super) {
	    __extends(J, _super);
	    function J() {
	        return _super.call(this, [new stonePosition_1.StonePosition(3, 0), new stonePosition_1.StonePosition(4, 0, true), new stonePosition_1.StonePosition(5, 0), new stonePosition_1.StonePosition(5, 1)], 2 /* j */) || this;
	    }
	    return J;
	}(stone_1.Stone));
	J.drawBlock = function (ctx, x, y) {
	    ctx.beginPath();
	    ctx.lineWidth = 2;
	    ctx.fillRect(x * constants_1.Constants.BLOCK_UNIT_SIZE, y * constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE);
	};
	exports.J = J;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var stone_1 = __webpack_require__(2);
	var stonePosition_1 = __webpack_require__(5);
	var constants_1 = __webpack_require__(6);
	var L = (function (_super) {
	    __extends(L, _super);
	    function L() {
	        return _super.call(this, [new stonePosition_1.StonePosition(3, 0), new stonePosition_1.StonePosition(4, 0, true), new stonePosition_1.StonePosition(5, 0), new stonePosition_1.StonePosition(3, 1)], 3 /* l */) || this;
	    }
	    return L;
	}(stone_1.Stone));
	L.drawBlock = function (ctx, x, y) {
	    ctx.beginPath();
	    ctx.lineWidth = 2;
	    ctx.fillRect(x * constants_1.Constants.BLOCK_UNIT_SIZE, y * constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE);
	};
	exports.L = L;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var stone_1 = __webpack_require__(2);
	var stonePosition_1 = __webpack_require__(5);
	var constants_1 = __webpack_require__(6);
	var O = (function (_super) {
	    __extends(O, _super);
	    function O() {
	        return _super.call(this, [new stonePosition_1.StonePosition(4, 0), new stonePosition_1.StonePosition(5, 0), new stonePosition_1.StonePosition(4, 1), new stonePosition_1.StonePosition(5, 1)], 4 /* o */) || this;
	    }
	    return O;
	}(stone_1.Stone));
	O.drawBlock = function (ctx, x, y) {
	    ctx.beginPath();
	    ctx.lineWidth = 2;
	    ctx.fillRect(x * constants_1.Constants.BLOCK_UNIT_SIZE, y * constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE);
	};
	exports.O = O;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var stone_1 = __webpack_require__(2);
	var stonePosition_1 = __webpack_require__(5);
	var constants_1 = __webpack_require__(6);
	var S = (function (_super) {
	    __extends(S, _super);
	    function S() {
	        return _super.call(this, [new stonePosition_1.StonePosition(4, 0, true), new stonePosition_1.StonePosition(5, 0), new stonePosition_1.StonePosition(3, 1), new stonePosition_1.StonePosition(4, 1)], 5 /* s */) || this;
	    }
	    return S;
	}(stone_1.Stone));
	S.drawBlock = function (ctx, x, y) {
	    ctx.beginPath();
	    ctx.lineWidth = 2;
	    ctx.fillRect(x * constants_1.Constants.BLOCK_UNIT_SIZE, y * constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE);
	};
	exports.S = S;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var stone_1 = __webpack_require__(2);
	var stonePosition_1 = __webpack_require__(5);
	var constants_1 = __webpack_require__(6);
	var T = (function (_super) {
	    __extends(T, _super);
	    function T() {
	        return _super.call(this, [new stonePosition_1.StonePosition(3, 0), new stonePosition_1.StonePosition(4, 0, true), new stonePosition_1.StonePosition(5, 0), new stonePosition_1.StonePosition(4, 1)], 6 /* t */) || this;
	    }
	    return T;
	}(stone_1.Stone));
	T.drawBlock = function (ctx, x, y) {
	    ctx.beginPath();
	    ctx.lineWidth = 2;
	    ctx.fillRect(x * constants_1.Constants.BLOCK_UNIT_SIZE, y * constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE);
	};
	exports.T = T;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var stone_1 = __webpack_require__(2);
	var stonePosition_1 = __webpack_require__(5);
	var constants_1 = __webpack_require__(6);
	var Z = (function (_super) {
	    __extends(Z, _super);
	    function Z() {
	        return _super.call(this, [new stonePosition_1.StonePosition(3, 0), new stonePosition_1.StonePosition(4, 0, true), new stonePosition_1.StonePosition(4, 1), new stonePosition_1.StonePosition(5, 1)], 7 /* z */) || this;
	    }
	    return Z;
	}(stone_1.Stone));
	Z.drawBlock = function (ctx, x, y) {
	    ctx.beginPath();
	    ctx.lineWidth = 2;
	    ctx.fillRect(x * constants_1.Constants.BLOCK_UNIT_SIZE, y * constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE, constants_1.Constants.BLOCK_UNIT_SIZE);
	};
	exports.Z = Z;


/***/ })
/******/ ]);