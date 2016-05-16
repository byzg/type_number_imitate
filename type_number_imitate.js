// created by byzg
// https://github.com/byzg/type_number_imitate
(function () {
    var TypeNumberInitate;
    window.TypeNumberInitate = TypeNumberInitate = function () {
        function TypeNumberInitate($input) {
            this.$input = $input;
            this.init();
        }
        TypeNumberInitate.prototype.isValid = function (val) {
            var parsed, result;
            if (!(this.min || this.max)) {
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
        TypeNumberInitate.prototype.stepFn = function (val) {
            var newVal, oldVal;
            oldVal = this.parseFn(this.$input.val());
            newVal = oldVal + this.parseFn(val);
            if (this.isValid(newVal)) {
                this.$input.val(newVal);
                this.$plus.toggleClass('disabled', newVal === this.max);
                this.$minus.toggleClass('disabled', newVal === this.min);
                this.$input.trigger('change');
                return newVal;
            } else {
                return oldVal;
            }
        };
        TypeNumberInitate.prototype.increment = function () {
            return this.stepFn(this.step);
        };
        TypeNumberInitate.prototype.decrement = function () {
            return this.stepFn(-this.step);
        };
        TypeNumberInitate.prototype.init = function () {
            this.initAttrs();
            this.initWrap();
            return this.initHandlers();
        };
        TypeNumberInitate.prototype.initAttrs = function () {
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
        TypeNumberInitate.prototype.initHandlers = function () {
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
        TypeNumberInitate.prototype.initWrap = function () {
            this.$input.wrap('<div class="type-number-initate"></div>');
            this.$container = this.$input.parent();
            this.$plus = jQuery('<span class="plus">+</span>');
            this.$minus = jQuery('<span class="minus">\u2013</span>');
            this.$container.append(this.$plus);
            return this.$container.append(this.$minus);
        };
        return TypeNumberInitate;
    }();
    new TypeNumberInitate($('input'));
}.call(this));
