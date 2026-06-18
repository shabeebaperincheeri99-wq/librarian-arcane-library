'use strict';
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

function assert(condition, msg) {
  if (!condition) { console.error('FAIL:', msg); process.exit(1); }
}

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true
});

const { window } = dom;

// Give scripts time to run
setTimeout(() => {
  const doc = window.document;

  // 1. Intro screen should be visible by default
  const introScreen = doc.getElementById('intro-screen');
  const gameScreen = doc.getElementById('game-screen');
  const winScreen = doc.getElementById('win-screen');

  assert(introScreen !== null, 'FAIL: intro-screen must exist');
  assert(introScreen.style.display !== 'none', 'FAIL: intro-screen should be visible at start');
  assert(gameScreen !== null, 'FAIL: game-screen must exist');
  assert(!winScreen || winScreen.style.display !== 'flex', 'FAIL: win-screen must NOT be shown at start');

  console.log('✓ Intro screen visible, win screen hidden at load');

  // 2. Click start button
  const startBtn = doc.getElementById('start-btn');
  assert(startBtn !== null, 'FAIL: #start-btn must exist');
  startBtn.click();

  setTimeout(() => {
    // 3. Game screen now active
    assert(gameScreen.style.display === 'flex', 'FAIL: game-screen should be flex after start');
    assert(introScreen.style.display === 'none', 'FAIL: intro-screen should be hidden after start');

    // 4. Win screen still hidden
    assert(!winScreen || winScreen.style.display !== 'flex', 'FAIL: win-screen must NOT show immediately after start');

    console.log('✓ Game screen active after clicking Begin Sorting');

    // 5. Floor books rendered
    const floorBooks = doc.querySelectorAll('.floor-book');
    console.log('  Floor books rendered on floor 1:', floorBooks.length);
    assert(floorBooks.length >= 100, `FAIL: expected >=100 floor books, got ${floorBooks.length}`);

    console.log('✓ Floor books >= 100 (' + floorBooks.length + ' rendered)');

    // 6. ALL_BOOKS count check via HUD
    const booksCounter = doc.getElementById('books-counter');
    assert(booksCounter !== null, 'FAIL: books-counter must exist');
    const totalMatch = booksCounter.textContent.match(/\/(\d+)/);
    const total = totalMatch ? parseInt(totalMatch[1]) : 0;
    console.log('  Total books in game:', total);
    assert(total >= 2500, `FAIL: expected >=2500 total books, got ${total}`);

    console.log('✓ Total books count:', total);

    // 7. HUD elements exist
    assert(doc.getElementById('timer') !== null, 'FAIL: timer must exist');
    assert(doc.getElementById('capacity') !== null, 'FAIL: capacity must exist');
    assert(doc.getElementById('shelf-panel') !== null, 'FAIL: shelf-panel must exist');

    console.log('✓ HUD elements present');

    // 8. Shelf panel has content
    const shelfSections = doc.querySelectorAll('.section-header');
    console.log('  Shelf sections rendered:', shelfSections.length);
    assert(shelfSections.length >= 5, `FAIL: expected shelf sections, got ${shelfSections.length}`);

    console.log('✓ Shelf sections rendered:', shelfSections.length);

    console.log('\n✅ ALL TESTS PASSED');
    process.exit(0);
  }, 300);
}, 100);

setTimeout(() => {
  console.error('FAIL: test timed out');
  process.exit(1);
}, 5000);
