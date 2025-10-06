/* material_theme.js - render shortcuts and inject global logo into Desk */

(function(){
  // Where to load shortcuts from:
  // Edit this JSON file if you want to add shortcuts without changing code:
  var SHORTCUTS_JSON = '/assets/custom_theme_v15/shortcuts.json';

  function injectLogo(){
    try {
      var nav = document.querySelector('header.navbar .navbar-inner') || document.querySelector('header.navbar');
      if(!nav) return;
      // avoid duplicate injection
      if(nav.querySelector('.cp-logo-global')) return;

      var brand = document.createElement('div');
      brand.className = 'brand cp-brand';
      var img = document.createElement('img');
      img.src = '/assets/custom_theme_v15/images/cleanplusn.png';
      img.className = 'cp-logo-global';
      img.alt = 'CleanPlus';

      // Insert at the left of navbar (if exists)
      brand.appendChild(img);
      // Prepend to nav
      if(nav.firstChild) nav.insertBefore(brand, nav.firstChild);
      else nav.appendChild(brand);
    } catch(e){
      console.warn('cp: injectLogo failed', e);
    }
  }

  function renderShortcuts(shortcuts){
    // Create the container under navbar
    var container = document.querySelector('.cp-shortcuts');
    if(container) return; // already rendered
    container = document.createElement('div');
    container.className = 'cp-shortcuts';
    // Insert after the navbar
    var header = document.querySelector('header.navbar') || document.querySelector('.navbar');
    if(header && header.parentNode){
      header.parentNode.insertBefore(container, header.nextSibling);
    } else {
      // fallback: prepend to body
      document.body.insertBefore(container, document.body.firstChild);
    }

    shortcuts.forEach(function(s){
      var a = document.createElement('div');
      a.className = 'cp-shortcut';
      a.title = s.title || '';

      var ic = document.createElement('div');
      ic.className = 'cp-ic';
      // If icon text provided, use it, else first letter
      ic.innerText = s.icon_text || (s.title ? s.title[0].toUpperCase() : '?');

      var meta = document.createElement('div');
      meta.className = 'cp-meta';
      var t = document.createElement('div');
      t.style.fontWeight = '600';
      t.innerText = s.title || 'Shortcut';
      var d = document.createElement('div');
      d.className = 'small';
      d.innerText = s.description || '';

      meta.appendChild(t);
      meta.appendChild(d);

      a.appendChild(ic);
      a.appendChild(meta);

      // Clicking: if route present, navigate using frappe.set_route or window.location
      a.addEventListener('click', function(){
        if(typeof frappe !== 'undefined' && s.route){
          // try to navigate as frappe route first
          try {
            // if route looks like 'Form/DocType/name' or a standard route array
            if(Array.isArray(s.route)) frappe.set_route(s.route);
            else frappe.set_route(s.route);
            return;
          } catch(e){
            // fallback
          }
        }
        if(s.href) window.location.href = s.href;
      });

      container.appendChild(a);
    });
  }

  // Fetch shortcuts.json (a file you can edit in the repo)
  function loadShortcuts(){
    fetch(SHORTCUTS_JSON).then(function(r){
      if(!r.ok) throw new Error('no shortcuts file');
      return r.json();
    }).then(function(data){
      if(Array.isArray(data)) renderShortcuts(data);
    }).catch(function(){
      // fallback: default shortcuts
      renderShortcuts([
        {"title":"New Sales Invoice","route":["List","Sales Invoice"],"description":"Open Sales Invoices","icon_text":"SI"},
        {"title":"New Item","route":["List","Item"],"description":"Items & products","icon_text":"IT"},
        {"title":"Company","route":["Form","Company","Company"],"description":"Company Settings","icon_text":"CP"}
      ]);
    });
  }

  // Try to run after DOM loaded, but also periodically for SPAs
  function trySetup(){
    injectLogo();
    loadShortcuts();
  }

  document.addEventListener('DOMContentLoaded', function(){ setTimeout(trySetup, 550); });
  // also try again after small interval for SPA navigation
  setTimeout(trySetup, 2000);
})();
