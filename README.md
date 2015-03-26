# Sift
Check, filter and sort through a list of scrollable items. Available as an Angular JS module. Items are loaded asynchronuously. See the [live demo](http://fcosrno.github.io/sift/).

## Quick Usage

This is all you need to start using all the Sift features.

	// Add Sift as a dependency to your app
	angular.module('your-app', ['sift']);
	
	// Use the sift-panel directive in your HTML
	<div sift-panel url="http://jsonplaceholder.typicode.com/posts"></div>

Make sure the `url` attribute points to a JSON with an *id* and *title* field. If you don't have a title field you can let Sift know with the `title-as` attribute:

	// Display and sort by the "name" field instead of "title"
	<div sift-panel url="http://jsonplaceholder.typicode.com/posts" title-as="name"></div>


## Dependencies

Sift depends on Angular. The HTML is based on [Bootstrap's Panel markup](http://getbootstrap.com/components/#panels) and uses [Font Awesome icons](http://fortawesome.github.io/Font-Awesome/), but either library is really optional.

## Stylesheet

All the CSS classes used by Sift to style the panel can be found in the *style.css* file in the app folder. You can copy it as a baseline and modify to your needs.

## Roadmap

###[0.2.2]
- Clear search field on Selected only checkbox click
- Allow user to customize CSV input name

###[0.2.3]
- Add testing

### [x.x.x]
- Allow user to modify HTML markup
- Provide a lazy loading solution for long items (>2k?)
- Allow user to define loading technique: all or lazy