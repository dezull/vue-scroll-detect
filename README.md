# Vue Scroll Detect

Detect component visibility change on scrolling.

## Installation

```shell
yarn add vue-scroll-detect
```

## Example

See `examples/` at [Code Sandbox](https://codesandbox.io/s/vue-scroll-detect-fefte)

## Usage

#### ES Import

```javascript
import { Scrollable, ScrollContainer } from 'vue-scroll-detect'
```

#### UMD build

```html
<script src="vue-scroll-detect.umd.min.js"></script>
<script>
const { ScrollContainer, Scrollable } = VueScrollDetect
...
</script>
```

`visible` and `invisible` events are emitted when element visibility changes in a scrollable container, either an element or `window`.

To watch for element visibility, put it inside `Scrollable`, which in turns must be nested inside a `ScrollContainer`. See `src/examples` for more.

#### Example

```vue
<ScrollContainer :initial-event="true">
  <ul>
    <li
      v-for="(item, index) in items"
      ref="items"
      :key="item.key"
    >
      <Scrollable
        @visible="onVisible(item, index, $event)"
        @invisible="onInvisible(item, index, $event)"
      >
        <span class="item">{{ item.value }}</span>
      </Scrollable>
    </li>
  </ul>
</ScrollContainer>
```

#### Props

##### ScrollContainer

| Name            | Type    | Description                                                                                                                                                            |
| --------------- | ------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`          | Boolean | To watch visibility of elements as they enter/exit the window viewport. By default this is `false`, so the container itself must be scrollable eg: `overflow: scroll`. |
| `initial-event` | Boolean | Whether to receive initial visibility of `Scrollable` elements on component mount.                                                                                     |

## License

Vue Scroll Detect is released under the [MIT License](https://opensource.org/licenses/MIT).
