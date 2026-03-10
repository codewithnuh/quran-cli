# Quran CLI

> The Quran in your terminal. Read, search, bookmark, and discover ayahs from the command line.

```bash
$ quran-cli read 2:255

─────────────────────────────────────────────
  Al-Baqara — Ayah 255  |  البقرة
─────────────────────────────────────────────
  Allah - there is no deity except Him,
  the Ever-Living, the Sustainer of existence.
  Neither drowsiness overtakes Him nor sleep...
─────────────────────────────────────────────
  Translation by: Muhammad Asad
  Juz: 3  |  Page: 42
````

---

## Installation

```bash
npm install -g @codewithnuh/quran-cli
```

> Requires Node.js 18 or higher.
> **Note:** After global installation, the CLI command is `quran-cli`, not the scoped package name.

---

## Commands

### `read <ref>`

Read a specific ayah by surah and ayah number.

```bash
quran-cli read 2:255        # Al-Baqara, Ayah 255 (Ayat al-Kursi)
quran-cli read 1:1          # Al-Fatiha, first ayah
quran-cli read 112:1        # Al-Ikhlas, first ayah
quran-cli read 36:1         # Ya-Sin, first ayah
```

**Reference format:** `<surah>:<ayah>` — surah number, colon, ayah number.

---

### `search <query>`

Search the Quran by keyword. Returns matching ayahs with surah and ayah references.

```bash
quran-cli search patience
quran-cli search "the merciful"
quran-cli search light
quran-cli search "Day of Judgment"
```

**Options:**

| Option                 | Description               | Default |
| ---------------------- | ------------------------- | ------- |
| `-l, --limit <number>` | Number of results to show | `10`    |

```bash
quran-cli search patience --limit 5     # show only 5 results
quran-cli search mercy --limit 20       # show up to 20 results
```

---

### `random`

Get a random ayah. Different every time.

```bash
quran-cli random
```

Good for daily reflection. Run it every morning.

---

### `bookmark`

Manage your personal collection of saved ayahs.

#### `bookmark add <ref>`

Save an ayah to your bookmarks.

```bash
quran-cli bookmark add 2:255      # bookmark Ayat al-Kursi
quran-cli bookmark add 1:1        # bookmark Al-Fatiha opening
quran-cli bookmark add 18:10      # bookmark the cave ayah
```

Duplicate bookmarks are automatically ignored.

#### `bookmark list`

View all your saved bookmarks in a table.

```bash
quran-cli bookmark list
```

```
┌────────┬──────────────────┬──────────────────────────────────────────┐
│ Ref    │ Surah            │ Translation (preview)                    │
├────────┼──────────────────┼──────────────────────────────────────────┤
│ 2:255  │ Al-Baqara        │ Allah - there is no deity except Him...  │
│ 1:1    │ Al-Fatiha        │ In the name of Allah, the Entirely Me... │
│ 18:10  │ Al-Kahf          │ When the youths took refuge in the ca... │
└────────┴──────────────────┴──────────────────────────────────────────┘
```

#### `bookmark remove <ref>`

Remove an ayah from your bookmarks.

```bash
quran-cli bookmark remove 2:255
quran-cli bookmark remove 1:1
```

---

## Examples

**Morning routine — random ayah with your coffee:**

```bash
quran-cli random
```

**Look up a specific ayah you heard:**

```bash
quran-cli read 93:1
```

**Research a topic:**

```bash
quran-cli search gratitude --limit 15
quran-cli search "those who believe"
quran-cli search paradise
```

**Build a personal collection:**

```bash
quran-cli bookmark add 2:286     # Allah does not burden a soul beyond that it can bear
quran-cli bookmark add 94:5      # With hardship comes ease
quran-cli bookmark add 3:173     # Allah is sufficient for us
quran-cli bookmark list
```

**Remove one you no longer need:**

```bash
quran-cli bookmark remove 3:173
```

---

## Translation

All translations use **Muhammad Asad's** English translation (`en.asad`) — one of the most respected modern translations for its linguistic precision and depth.

Powered by the [AlQuran Cloud API](https://alquran.cloud/api).

---

## Data & Privacy

* No account required
* No data sent to any server except the Quran API for fetching ayahs
* Bookmarks stored locally at `~/.quran-cli/bookmarks.json`
* API responses cached locally at `~/.quran-cli/cache.json` to reduce network calls

---

## Requirements

* Node.js >= 18
* Internet connection for fetching ayahs (cached after first fetch)

---

## Contributing

Contributions are welcome. Open an issue or pull request on GitHub:

```bash
git clone https://github.com/codewithnuh/quran-cli
cd quran-cli
npm install
npm link
quran-cli read 1:1
```

---

## License

MIT License

Copyright (c) 2026 Noor-ul-Hassan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

<p align="center">
  Built with care &nbsp;·&nbsp; <a href="https://alquran.cloud">AlQuran Cloud API</a>
</p>
