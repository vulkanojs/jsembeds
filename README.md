# JS EMBEDS

## An SDK for embeadable JS widgets

## Roadmap

- ~~Project setup using Vulkano~~
- ~~Verify front end JS enviroment is working as planned~~
- ~~Playgroud setup~~
- ~~Configuration file design and developer experience design~~
- ~~Base entry point~~
- Embed stylesheets
- Execute scripts and render initial content only if available
- Encapsulate jquery and pass it to the widgets

## Usage

### Javascript SDK

```
<script src="https://js/sdk.js"></script>

<!-- or -->

<script type="text/javascript">
  (function onLoadSDK(d, s, id) {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    const js = d.createElement(s);
    js.id = id;
    js.src = 'https://js/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'ecard-sdk'));
</script>
```

### Initialize

#### 1. HTML Markup

Add the following HTML in the containing page wherever you want the SDK functionality to be populated:

```
... your HTML content
  <div class="container" style="opacity:0"></div>
... your HTML content...
```

Or

#### 2. JS initialization

```
<script type="text/javascript">
  window.onSDKLoad = function() {
    SDK.myComponent({
      el: '.container'
    });
  };
</script>
```

### Rules

When implementing this SDK, please make sure follows these rules:

- Make sure...
