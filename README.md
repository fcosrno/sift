# Sift
Check, filter and sort through a list of scrollable items. Available as an Angular JS module. Items are loaded asynchronuously. See the [live demo](http://fcosrno.github.io/sift/).

## Quick Usage

	<div sift-panel url="http://jsonplaceholder.typicode.com/posts" title-as="name"></div>


## Dependencies

Sift depends on Angular. The HTML is based on [Bootstrap's Panel markup](http://getbootstrap.com/components/#panels) and uses [Font Awesome icons](http://fortawesome.github.io/Font-Awesome/), but either library is really optional.

## Roadmap

###[0.2.1]
- Add clear button in filter input
- Display count of items

###[0.2.2]
- Add testing

### [x.x.x]
- Provide a lazy loading solution for long items (>2k?)
- Allow user to define loading technique: all or lazy