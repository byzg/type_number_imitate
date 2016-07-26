# created by byzg
# https://github.com/byzg/type_number_imitate
window.TypeNumberImitate = class TypeNumberImitate
  constructor: ($input, opts = {}) ->
    @$input = jQuery($input)
    @opts = opts
    @opts.wrapperClasses ||= ''
    @opts.plusClasses ||= ''
    @opts.minusClasses ||= ''
    if @$input.length && !@alreadyImitated()
      @init()
      @toggleDisabled()

  isValid: (val)->
    return true if val == '' || !(@min? || @max?)
    parsed = @parseFn(val);
    result = !isNaN(parsed) && !!('' + val).match(@regex)
    result &= (parsed >= @min) if @min
    result &= (parsed <= @max) if @max
    !!result

  valAfterType: (typedStr, keyDownCode = null)->
    currentVal = @$input.val()
    selectionStart = @$input.get(0).selectionStart
    selectionEnd = @$input.get(0).selectionEnd
    deltaStart = deltaEnd = 0
    deltaStart = -1 if keyDownCode == 8
    deltaEnd = 1 if keyDownCode == 46
    currentVal.substr(0, selectionStart + deltaStart) + typedStr + currentVal.substr(selectionEnd + deltaEnd)

  toggleDisabled: ->
    val = @$input.val()
    @$plus.toggleClass 'disabled', val == @max
    @$minus.toggleClass 'disabled', val == @min

  stepFn: (val)->
    oldVal = @$input.val()
    oldVal = @min - 1 if oldVal == ''
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
    _.each @$input.data(), (v, k)=>
      @opts[_.camelCase(k[3..-1])] = v if k[0..2] == 'tni'
    @float = @$input.is('[float]')
    @parseFn = if @float then parseFloat else parseInt
    @min = @parseFn(min) if min = @$input.attr('min')
    @max = @parseFn(max) if max = @$input.attr('max')
    unless typeof(@opts.skipPlaceholder) == 'string'
      @placeholer = @$input.attr('placeholder') || @min
      @$input.attr('placeholder', @placeholer)
    @step = @parseFn(@$input.attr('step') || 1)
    regexStr = '^[0-9]+'
    regexStr += '\.?([0-9]+)?' if @float
    regexStr += '$'
    regexStr = regexStr.replace(/[.]/g, '\\$&')
    @regex = new RegExp(regexStr, 'g')

  initHandlers: ->
    @$input.on('keypress', (e) =>
      @isValid(@valAfterType(String.fromCharCode(e.charCode)))
    ).on('keydown', (e) =>
      if _.includes([38, 40], e.keyCode)
        @increment() if e.keyCode == 38
        @decrement() if e.keyCode == 40
        e.preventDefault()
      else if _.includes([8, 46], e.keyCode)
        e.preventDefault() unless @isValid(@valAfterType('', e.keyCode))
    ).on('paste', (e) =>
      pasted = e.originalEvent.clipboardData.getData('text')
      e.preventDefault() unless @isValid(@valAfterType(pasted))
    ).on('cut', (e) =>
      e.preventDefault() unless @isValid(@valAfterType(''))
    )
    @$plus.click => @increment()
    @$minus.click => @decrement()

  initWrap: ->
    @$input.wrap("<div class='type-number-imitate #{@opts.wrapperClasses}'></div>")
    @$container = @$input.parent()
    @$plus = jQuery("<span class='plus #{@opts.plusClasses}'>+</span>")
    @$minus = jQuery("<span class='minus #{@opts.minusClasses}'>–</span>")
    @$container.append(@$plus)
    @$container.append(@$minus)