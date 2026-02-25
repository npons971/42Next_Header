# 42Next Header (Python + C)

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/nopons.42next-banner?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=nopons.42next-header)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Updated **42-style banner** extension for VSCode with **Python flake8 norm support** (79 characters).

Based on the original [42header by kube](https://github.com/kube/vscode-42header), this version adds Python compatibility and modern tooling while delivering a new header look.

---

## Installation

1. Open VSCode
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Type: `ext install nopons.42next-header`
4. Press Enter

Or search "42Next Header" in the Extensions view (`Ctrl+Shift+X`).

---

## ⚙️ Configuration ⚙️

Set your 42 username and email in VSCode settings:

**Option 1: Via Settings UI**
1. Press `Ctrl+,` (or `Cmd+,` on Mac)
2. Search for "42header"
3. Fill in:
   - **Username**: Your 42 login
   - **Email**: Your 42 email

**Option 2: Via settings.json**

Press `Ctrl+Shift+P` → "Preferences: Open User Settings (JSON)"

```json
{
  "42header.username": "your-login",
  "42header.email": "your-login@student.42.fr"
}
```

---

## Usage

### Insert Header

**Keyboard Shortcuts:**
- **macOS**: `Cmd` + `Alt` + `H`
- **Linux/Windows**: `Ctrl` + `Alt` + `H`

**Command Palette:**
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Insert 42 header"
3. Press Enter

### Auto-Update

The header automatically updates the "Updated" timestamp and author when you save the file.

---

## Shebang Directive

The Python header includes a built-in `shebang` field on its second line that controls automatic shebang insertion:

| Value          | Effect                                                          |
|----------------|-----------------------------------------------------------------|
| `shebang: 1`   | Shebang is preserved if present, or auto-added for Python. *(default)* |
| `shebang: 0`   | No shebang is inserted or preserved (even for Python files).    |

To toggle the shebang, simply change the `1` to `0` (or vice versa) directly in the header and save the file. The shebang line (`#!/usr/bin/env python3`) will be automatically added or removed on the next save.

**Example — disable shebang for a Python file:**

Change `shebang: 1` to `shebang: 0` on the second line of the header, then save.

---

## Header Examples

### C/C++ (80 characters)

```c
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: your-login <your-login@student.42.fr>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/01/27 10:00:00 by your-login       #+#    #+#              */
/*   Updated: 2026/01/27 12:00:00 by your-login      ###   ########.fr        */
/*                                                                            */
/* ************************************************************************** */
```

### Python (79 characters - flake8)

```python
#!/usr/bin/env python3

# ########################################################################### #
# #   shebang: 1                                                              #
# #                                                       :::      ::::::::   #
# #   script.py                                          :+:      :+:    :+:  #
# #                                                   +:+ +:+         +:+     #
# #   By: your-login <your-login@student.42.fr>      +#+  +:+       +#+       #
# #                                               +#+#+#+#+#+   +#+           #
# #   Created: 2026/01/27 10:00:00 by your-login       #+#    #+#             #
# #   Updated: 2026/01/27 12:00:00 by your-login      ###   ########.fr       #
# #                                                                           #
# ########################################################################### #
```

---

## Credits

- Original extension by [kube](https://github.com/kube/vscode-42header)

---

## 📦 Packaging

To build the VSIX package locally:

```bash
# Install vsce (if not already installed)
npm install -g @vscode/vsce

# Build the package
vsce package
```

To install the generated `.vsix` file:
```bash
code --install-extension 42next-header-x.x.x.vsix
```

---

## Support

- **Issues**: [GitHub Issues](https://github.com/npons971/42Next_Header/issues)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---
