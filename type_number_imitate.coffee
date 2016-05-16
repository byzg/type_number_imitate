# created by byzg
# https://github.com/byzg/type_number_imitate
window.TypeNumberImitate = class TypeNumberImitate
  constructor: ($input) ->
    @$input = jQuery($input)
    unless @alreadyImitated()
      @init()
      @toggleDisabled()

  isValid: (val)->
    return true if val == '' || !(@min? || @max?)
    parsed = @parseFn(val);
    result = !isNaN(parsed) && !!('' + val).match(@regex)
    result &= (parsed >= @min) if @min
    result &= (parsed <= @max) if @max
    !!result

  toggleDisabled: ->
    val = @$input.val()
    @$plus.toggleClass 'disabled', val == @max
    @$minus.toggleClass 'disabled', val == @min

  stepFn: (val)->
    oldVal = @$input.val()
    oldVal = 0 if oldVal == ''
    oldVal = @parseFn(oldVal)
    newVal = oldVal + @parseFn(val)
    if @isValid(newVal)
      @$input.val newVal
      @toggleDisabled()
      @$input.trigger 'change'
      newVal
    else
      oldVal

  alreadyImitated: ->
    @$input.data().typeNumberImitated

  increment: ->
    @stepFn(@step)

  decrement: ->
    @stepFn(-@step)

  init: ->
    @initAttrs()
    @initWrap()
    @initHandlers()
    @$input.data('type-number-imitated', true)

  initAttrs: ->
    @float = @$input.is('[float]')
    @parseFn = if @float then parseFloat else parseInt
    @min = @parseFn(min) if min = @$input.attr('min')
    @max = @parseFn(max) if max = @$input.attr('max')
    @step = @parseFn(@$input.attr('step') || 1)
    regexStr = '^[0-9]+'
    regexStr += '\.?([0-9]+)?' if @float
    regexStr += '$'
    regexStr = regexStr.replace(/[.]/g, '\\$&')
    @regex = new RegExp(regexStr, 'g')

  initHandlers: ->
    @$input.keypress((e) =>
      @isValid(@$input.val() + String.fromCharCode(e.charCode))
    ).on('keydown', (e) =>
      @increment() if e.keyCode == 38
      @decrement() if e.keyCode == 40
      e.preventDefault() if _.includes([38, 40], e.keyCode)
    ).on 'paste', (e) =>
      pasted = e.originalEvent.clipboardData.getData('text')
      e.preventDefault() unless @isValid(@value + pasted)
    @$plus.click => @increment()
    @$minus.click => @decrement()

  initWrap: ->
    @$input.wrap('<div class="type-number-imitate"></div>')
    @$container = @$input.parent()
    @$plus = jQuery('<span class="plus">+</span>')
    @$minus = jQuery('<span class="minus">–</span>')
    @$container.append(@$plus)
    @$container.append(@$minus)
