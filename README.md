# Sift
Check, filter and sort through a list of scrollable items. Available as an Angular JS module. Items are loaded asynchronuously. See the [live demo](http://fcosrno.github.io/sift/).

## Quick Usage

This is all you need to start using all the Sift features.

	// Add Sift as a dependency to your app
	angular.module('your-app', ['sift']);
	
	// Use the sift-panel directive in your HTML
	<div sift-panel url="http://jsonplaceholder.typicode.com/posts"></div>

Make sure the `url` attribute points to a JSON with an *id* and *title* field. Keep reading to learn how to customize these defaults.

## How it works

Sift will convert the sift-panel directive into [HTML markup](http://fcosrno.github.io/sift/). This markup will have a filter toolset on top and the selectable items below. 

As the user selects items, Sift adds each item's id to a comma-separated string in a hidden input field named *selected_items* located at the bottom of the panel. You can use the values of this field to save the selected items wherever you want.

	// String of ids refer to the id value from the JSON file, not array keys
	<input type="hidden" name="selected_items" value="1,3,5">

## Dependencies

Sift depends on Angular. The HTML is based on [Bootstrap's Panel markup](http://getbootstrap.com/components/#panels) and uses [Font Awesome icons](http://fortawesome.github.io/Font-Awesome/), but either library is really optional.


## Customizatons

### Title field

If you don't have a title field in your JSON data, or you would like to sort by another field, you can let Sift know with the `title-as` attribute.

	// Display and sort by the "name" field instead of "title"
	<div sift-panel url="http://jsonplaceholder.typicode.com/users" title-as="name"></div>
	
### Input field

You can replace the *selected_items* field name with the `field-as` attribute. This is useful when loading two Sift instances in the same form.

	// Put the results in hidden input field named "my-users"
	<div sift-panel url="http://jsonplaceholder.typicode.com/users" field-as="my-users"></div>
	
	// Generates a hidden input with custom name
	<input type="hidden" name="my-users" value="1,3,5">

### Pre-select values

You can tell Sift to pre-select items on load time by passing a list of comma-separated ids to the `value` attribute.

	<div sift-panel url="http://jsonplaceholder.typicode.com/posts" value="1,3,5"></div>

## Stylesheet

All the CSS classes used by Sift to style the panel can be found in the *style.css* file in the app folder. You can copy it as a baseline and modify to your needs.

## Roadmap

Take a look at the [CHANGELOG](https://github.com/fcosrno/sift/blob/master/CHANGELOG.md) for completed tasks.

###[0.3.0]
- Add testing
- When clicking on "Selected only" scroll lists window to top

### [x.x.x]
- Allow user to modify HTML markup
- Provide a lazy loading solution for long items (>2k?)
- Allow user to define loading technique: all or lazy