# Cachr

This is a very small library that serves to provide a fallback to **Service Workers** in browser where support is absent. **Application Cache** has relatively good browser support and is well suited for a _service worker fallback_.

It simply implements Application Cache with an easy interface.

## Support
- Internet Explorer 10+
- Safari 4+
- Firefox 3.5+
- Opera 11.5+
- Chrome 5+

## Setting up (How to)

- [Create an <b><i>.appcache</i></b> file](https://www.sitepoint.com/creating-offline-html5-apps-with-appcache/) with the name <q>manifest</q> in the root folder of your web project.
- Copy in the <i><q>offline.html</q></i> file into the root folder of your web project.
- Create your application index file and link it to _Cachr_ using a script tag.
- Use the script shown below to activate Cachr

```js
	<script type="text/javascript">
		!function(win){
			'use strict';

			if(win.applicationCache && win.Cachr){
				win.Cachr.go();
			}
		}(this);
	</script>
```

And that's all to it.

## Important Info

>The _manifest.appcache_ file must be in the root of your application as well as the _offline.html_ file. By extension, this means that both files must be in the same domain so as to avoid Same-Origin Policy restrictions by the browser. _Please see the <b>examples</b> folder for more insight_

## Caveats

>If any of the files listed in the _manifest.appcache_ file is modified, the _manifest.appcache_ file itself must also be modified. You can do this by altering the date comment on the second line using a _server script_ or a _cron job_ perhaps so you don't have to do it manually yourself everytime.

# Licence

MIT license
