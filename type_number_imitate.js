// created by byzg
// https://github.com/byzg/type_number_imitate
(function () {
    var TypeNumberImitate;
    window.TypeNumberImitate = TypeNumberImitate = function () {
        function TypeNumberImitate($input) {
            this.$input = jQuery($input);
            if (!this.alreadyImitated()) {
                this.init();
                this.toggleDisabled();
            }
        }
        TypeNumberImitate.prototype.isValid = function (val) {
            var parsed, result;
            if (val === '' || !(this.min != null || this.max != null)) {
                return true;
            }
            parsed = this.parseFn(val);
            result = !isNaN(parsed) && !!('' + val).match(this.regex);
            if (this.min) {
                result &= parsed >= this.min;
            }
            if (this.max) {
                result &= parsed <= this.max;
            }
            return !!result;
        };
        TypeNumberImitate.prototype.toggleDisabled = function () {
            var val;
            val = this.$input.val();
            this.$plus.toggleClass('disabled', val === this.max);
            return this.$minus.toggleClass('disabled', val === this.min);
        };
        TypeNumberImitate.prototype.stepFn = function (val) {
            var newVal, oldVal;
            oldVal = this.$input.val();
            if (oldVal === '') {
                oldVal = 0;
            }
            oldVal = this.parseFn(oldVal);
            newVal = oldVal + this.parseFn(val);
            if (this.isValid(newVal)) {
                this.$input.val(newVal);
                this.toggleDisabled();
                this.$input.trigger('change');
                return newVal;
            } else {
                return oldVal;
            }
        };
        TypeNumberImitate.prototype.alreadyImitated = function () {
            return this.$input.data().typeNumberImitated;
        };
        TypeNumberImitate.prototype.increment = function () {
            return this.stepFn(this.step);
        };
        TypeNumberImitate.prototype.decrement = function () {
            return this.stepFn(-this.step);
        };
        TypeNumberImitate.prototype.init = function () {
            this.initAttrs();
            this.initWrap();
            this.initHandlers();
            return this.$input.data('type-number-imitated', true);
        };
        TypeNumberImitate.prototype.initAttrs = function () {
            var max, min, regexStr;
            this.float = this.$input.is('[float]');
            this.parseFn = this.float ? parseFloat : parseInt;
            if (min = this.$input.attr('min')) {
                this.min = this.parseFn(min);
            }
            if (max = this.$input.attr('max')) {
                this.max = this.parseFn(max);
            }
            this.step = this.parseFn(this.$input.attr('step') || 1);
            regexStr = '^[0-9]+';
            if (this.float) {
                regexStr += '.?([0-9]+)?';
            }
            regexStr += '$';
            regexStr = regexStr.replace(/[.]/g, '\\$&');
            return this.regex = new RegExp(regexStr, 'g');
        };
        TypeNumberImitate.prototype.initHandlers = function () {
            this.$input.keypress(function (_this) {
                return function (e) {
                    return _this.isValid(_this.$input.val() + String.fromCharCode(e.charCode));
                };
            }(this)).on('keydown', function (_this) {
                return function (e) {
                    if (e.keyCode === 38) {
                        _this.increment();
                    }
                    if (e.keyCode === 40) {
                        _this.decrement();
                    }
                    if (_.includes([
                            38,
                            40
                        ], e.keyCode)) {
                        return e.preventDefault();
                    }
                };
            }(this)).on('paste', function (_this) {
                return function (e) {
                    var pasted;
                    pasted = e.originalEvent.clipboardData.getData('text');
                    if (!_this.isValid(_this.value + pasted)) {
                        return e.preventDefault();
                    }
                };
            }(this));
            this.$plus.click(function (_this) {
                return function () {
                    return _this.increment();
                };
            }(this));
            return this.$minus.click(function (_this) {
                return function () {
                    return _this.decrement();
                };
            }(this));
        };
        TypeNumberImitate.prototype.initWrap = function () {
            this.$input.wrap('<div class="type-number-imitate"></div>');
            this.$container = this.$input.parent();
            this.$plus = jQuery('<span class="plus">+</span>');
            this.$minus = jQuery('<span class="minus">\u2013</span>');
            this.$container.append(this.$plus);
            return this.$container.append(this.$minus);
        };
        return TypeNumberImitate;
    }();
}.call(this));
