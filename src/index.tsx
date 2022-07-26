import ReactDOM from 'react-dom/client';
import * as React from 'react';
import classNames from 'classnames';

const CHAR_WIDTH = 9;
const CHAR_HEIGHT = 15;
const SCREEN_WIDTH = 56;
const SCREEN_HEIGHT = 20;
const SCALE = 2;

const COLORS = {
  BG: '#192f30',
  BGHIGHLIGHT: '#3a745d',
  RED: '#da4d43',
  1: '#2a4546',
  2: '#2e4a4b',
  3: '#264a4b',
  4: '#274e50',
  5: '#225a5d',
  6: '#1b666a',
  7: '#207479',
  8: '#27898f',
  9: '#2e9ea1',
  10: '#37a7aa',
  11: '#3fb6ba',
  12: '#39c9ce',
  13: '#3cd0d5',
  14: '#40d7dc',
  15: '#46dce1',
  16: '#5ce6eb',
  17: '#acf6f4',
};

const CHARACTERS =
  'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUu' +
  'VvWwXxYyZz.,:;!?&#/\\%\'"0123456789+-*()[]^`' +
  '█▟▙▜▛▀▄▐▌▝▘▗▖─═║╔╗╚╝╠╣╦╩╬><▲▼☺☻⚉♦♣♠♥  ™   ';
const CHARACTERS_GRID_WIDTH = 42;

// const html = htm.bind(h);

// const AppContext = createContext(null);
// const initialAppState = {
//   color: 17,
//   selectedCharacterIndex: 0,
//   hover: {
//     x: null,
//     y: null,
//   },
//   map: {
//     width: SCREEN_WIDTH,
//     height: SCREEN_HEIGHT,
//     data: new Array(SCREEN_WIDTH * SCREEN_HEIGHT).fill(' '),
//     colors: new Array(SCREEN_WIDTH * SCREEN_HEIGHT).fill(13),
//   },
// };
//
// function useAppState() {
//   return useContext();
// }

interface Z5WindowProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

function Z5Window({ title, children, className }: Z5WindowProps) {
  return (
    <div className={classNames('window', className)}>
      <div className="window-header-wrapper">
        <div className="window-header">
          <div className="window-title">{title}</div>
          <div className="window-header-line"></div>
        </div>
      </div>
      <div className="window-contents">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Z5Window className="main-window" title="Netronics Connect! - Tilemap Editor">
      <Z5Window className="tools-window" title="Tools"></Z5Window>
      <Z5Window className="map-window" title="Tilemap"></Z5Window>
      <Z5Window className="palette-window" title="Palette"></Z5Window>
    </Z5Window>
  );
}

const root = ReactDOM.createRoot(document.querySelector('#app') as Element);
root.render(<App />);

const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);

// Editor state
const state = {};
window.state = state;

// DOM Elements
const mapPropertiesForm = qs('#map-properties');
const charactersImage = qs('#characters');
const mapCanvas = qs('#map-canvas');
const tilesetCanvas = qs('#tileset-canvas');
const colorRadioInputs = qsa('#palette input');
const exportButton = qs('#export-button');
const exportOutputTextarea = qs('#export-output');

// Set properties and hook up handlers for properties form
// mapPropertiesForm.elements['height'].value = state.map.height;
// mapPropertiesForm.elements['width'].value = state.map.width;
// mapPropertiesForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   updateMapProperties(mapPropertiesForm.elements['width'].value, mapPropertiesForm.elements['height'].value);
// });

// // Setup map for drawing
// const mapCtx = mapCanvas.getContext('2d');
// mapCtx.webkitImageSmoothingEnabled = false;
// mapCtx.mozImageSmoothingEnabled = false;
// mapCtx.imageSmoothingEnabled = false;

// // Setup tileset for drawing
// // const tilesetCtx = tilesetCanvas.getContext('2d');
// tilesetCtx.webkitImageSmoothingEnabled = false;
// tilesetCtx.mozImageSmoothingEnabled = false;
// tilesetCtx.imageSmoothingEnabled = false;
// tilesetCanvas.width = CHARACTERS_GRID_WIDTH * CHAR_WIDTH;
// tilesetCanvas.height = Math.ceil(CHARACTERS.length / CHARACTERS_GRID_WIDTH) * CHAR_HEIGHT;
// tilesetCanvas.style.width = `${tilesetCanvas.width * SCALE}px`;
// tilesetCanvas.style.height = `${tilesetCanvas.height * SCALE}px`;

// // Hook up click handlers for palette
// for (const input of Array.from(colorRadioInputs)) {
//   input.addEventListener('change', (event) => {
//     state.color = Number.parseInt(input.value);
//     drawTileset(state.color);
//   });
// }

// // Hook up click handlers for tileset
// tilesetCanvas.addEventListener('click', (event) => {
//   const characterX = Math.floor(event.offsetX / (CHAR_WIDTH * SCALE));
//   const characterY = Math.floor(event.offsetY / (CHAR_HEIGHT * SCALE));
//   const index = (characterY * CHARACTERS_GRID_WIDTH) + characterX;
//   state.selectedCharacterIndex = index;
//   drawTileset(state.color, index);
// });

// // Hook up click handlers for map
// mapCanvas.addEventListener('mousedown', (event) => {
//   const tileX = Math.floor(event.offsetX / (CHAR_WIDTH * SCALE));
//   const tileY = Math.floor(event.offsetY / (CHAR_HEIGHT * SCALE));
//   const index = (tileY * state.map.width) + tileX;
//   state.map.data[index] = CHARACTERS[state.selectedCharacterIndex];
//   state.map.colors[index] = state.color;
//   drawMap();
// });
// mapCanvas.addEventListener('mousemove', (event) => {
//   const tileX = Math.floor(event.offsetX / (CHAR_WIDTH * SCALE));
//   const tileY = Math.floor(event.offsetY / (CHAR_HEIGHT * SCALE));

//   if (state.hover.x !== tileX || state.hover.y !== tileY) {
//     const oldIndex = (state.hover.y * state.map.width) + state.hover.x;
//     const index = (tileY * state.map.width) + tileX;
//     const character = CHARACTERS[state.selectedCharacterIndex];
//     const color = state.color;
//     drawCharacter(mapCtx, state.map.data[oldIndex], state.map.colors[oldIndex], state.hover.x, state.hover.y);
//     drawCharacter(mapCtx, character, color, tileX, tileY);
//     state.hover.x = tileX;
//     state.hover.y = tileY;

//     // Persist if we're drawing
//     if (event.buttons & 1) {
//       state.map.data[index] = CHARACTERS[state.selectedCharacterIndex];
//       state.map.colors[index] = state.color;
//     }
//   }
// });
// mapCanvas.addEventListener('mouseout', (event) => {
//   drawMap();
//   state.hover.x = null;
//   state.hover.y = null;
// });

// // Hook up export button
// exportButton.addEventListener('click', () => {
//   const exportMap = {...state.map};
//   exportMap.data = exportMap.data.join('');
//   exportMap.colors = exportMap.colors.map(color => color.toString(18)).join('');
//   const mapData = JSON.stringify(exportMap, null, 2);
//   exportOutputTextarea.value = [
//     `const mapData = ${mapData};`,
//     renderMap.toString(),
//   ].join('\n');
// });

/** NetConnect-compatible function for drawing exported tilemaps */
function renderMap(map, x, y) {
  // Find intersection
  const visibleTop = Math.max(0, y);
  const visibleLeft = Math.max(0, x);
  const visibleRight = Math.min(56, x + map.width);
  const visibleBottom = Math.min(20, y + map.height);

  for (let screenY = visibleTop; screenY < visibleBottom; screenY++) {
    for (let screenX = visibleLeft; screenX < visibleRight; screenX++) {
      const mapX = screenX - x;
      const mapY = screenY - y;
      const index = mapY * map.width + mapX;
      const character = map.data.charAt(index);
      const color = parseInt(map.colors.charAt(index), 18);
      drawText(character, color, screenX, screenY);
    }
  }
}

/** Dummy to keep the linter from yelling at me */
function drawText() {}

/** Resize map */
function updateMapProperties(width, height) {
  state.map.width = width;
  state.map.height = height;

  mapCanvas.width = width * CHAR_WIDTH;
  mapCanvas.height = height * CHAR_HEIGHT;
  mapCanvas.style.width = `${width * CHAR_WIDTH * SCALE}px`;
  mapCanvas.style.height = `${height * CHAR_HEIGHT * SCALE}px`;
  drawMap();
}

/** Draw current map state to the canvas */
function drawMap() {
  mapCtx.clearRect(0, 0, SCREEN_WIDTH * CHAR_WIDTH * SCALE, SCREEN_HEIGHT * CHAR_HEIGHT * SCALE);
  for (let y = 0; y < state.map.height; y++) {
    for (let x = 0; x < state.map.width; x++) {
      const index = y * state.map.width + x;
      const character = state.map.data[index];
      const color = state.map.colors[index];
      drawCharacter(mapCtx, character, color, x, y);
    }
  }
}

/** Redraw the tilset in the given color */
function drawTileset(color, selectedCharacterIndex) {
  tilesetCtx.clearRect(0, 0, tilesetCanvas.width, tilesetCanvas.height);
  for (let k = 0; k < CHARACTERS.length; k++) {
    const x = k % CHARACTERS_GRID_WIDTH;
    const y = Math.floor(k / CHARACTERS_GRID_WIDTH);
    drawCharacter(tilesetCtx, CHARACTERS[k], k === selectedCharacterIndex ? 'RED' : color, x, y);
  }
}

/** Draw a single character on a canvas */
function drawCharacter(ctx, character, color, x, y) {
  const index = CHARACTERS.indexOf(character);
  if (index === -1) {
    throw new Error(`Couldn't find character ${character}.`);
  }

  const charX = (index % CHARACTERS_GRID_WIDTH) * CHAR_WIDTH;
  const charY = Math.floor(index / CHARACTERS_GRID_WIDTH) * CHAR_HEIGHT;
  const destX = x * CHAR_WIDTH;
  const destY = y * CHAR_HEIGHT;

  ctx.clearRect(destX, destY, CHAR_WIDTH, CHAR_HEIGHT);
  ctx.drawImage(charactersImage, charX, charY, CHAR_WIDTH, CHAR_HEIGHT, destX, destY, CHAR_WIDTH, CHAR_HEIGHT);
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = COLORS[color];
  ctx.fillRect(destX, destY, CHAR_WIDTH, CHAR_HEIGHT);
  ctx.globalCompositeOperation = 'source-over';
}

// Init
// updateMapProperties(SCREEN_WIDTH, SCREEN_HEIGHT);
// drawTileset(state.color, state.selectedCharacterIndex);
