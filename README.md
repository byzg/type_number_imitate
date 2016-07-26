# TypeNumberImitate

jQuery-library to imitate `input[type='number']` for `input[type='text']`

WARNING: jQuery and [Lodash](https://lodash.com/docs) required.

Attributes `step` (default 1), `min`, `max` are supported.

Use attribute `float` (default false) to allow float typing.

Handlers on keyboard up (↑) and down (↓) changes value of input on step

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'type_number_imitate'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install type_number_imitate

## Usage

```html
<input class="first" float="" min="1" placeholder="1" type="text">
```
```javascript
new TypeNumberImitate('input.first');
```

Result:
```html
<div class="type-number-imitate">
  <input autocomplete="off" class="cart_variation_quantity" min="1" name="cart_variation[quantity]" placeholder="1" value="1">
  <span class="plus">+</span>
  <span class="minus">–</span>
</div>
```

## Options
```javascript
  new TypeNumberImitate(inputSelector, options);
```
* *wrapperClasses* - additional clases for wrapper div.type-number-imitate
* *plusClasses*, *minusClasses* - additional clases for plus and minus spans
```javascript
  new TypeNumberImitate('input.second', {wrapperClasses: 'green-border large'});
```

[Live demo](http://codepen.io/byzg/pen/VaNPMO)

## Development

After checking out the repo, run `bin/setup` to install dependencies. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/type_number_imitate. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

