function toggleMenu(event, turnOff){
	var body = document.body;
	if (turnOff) { body.classList.remove('menu-open'); }
	else { body.classList.toggle('menu-open'); }
};

function toggleSubMenu(event, turnOff){
	var body = document.body;
	var target = event.target.parentNode;
	var openMenus = document.getElementsByClassName('active');

	// If triggered by MediaQuery event, forceClose subMenu
	if (event.type === 'change') {
		if (openMenus.length != 0) {
			openMenus[0].classList.remove('active');
		}
	// If Anchor tag w/ subMenu is clicked, activate subMenu functionality
	} else if (!event.target.href) {
		// Prevent normal anchor function, display menu instead
		event.preventDefault();
		// Remove active class for all other elements besides event.target
		// Should not be more than 2, but new 'active' may not be 1st or 2nd

		if (openMenus.length) {
			for (var i = 0; openMenus.length > i; i++) {
				if (openMenus[i] != target) { openMenus[i].classList.remove('active'); }
		  }
    }

		// If there is no event (boolean parameter passed), turnOff menus
		if (!event) {
			target.classList.remove('active');
		// Else, toggle active menus
		} else {
			target.classList.toggle('active');
			// If SubMenu was activated, turn on overlay
			if (target.classList.contains('active')) {
				body.classList.add('menu-open');
			}
		}
	// else if Anchor.href was clicked (real link)
	} else {
		if (openMenus.length != 0) {
			openMenus[0].classList.remove('active');
			body.classList.remove('menu-open');
		}
	}
};

function closeMenus() {
	toggleSubMenu(event, true);
	toggleMenu(event, true);
};
