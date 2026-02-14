# Changelog

All notable changes to the "42 Header Next" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.1.0] - 2026-02-14

### Added
- Python shebang (`#!/usr/bin/env python3`) automatically added above the header for Python files
- Auto-detection and preservation of existing shebangs

### Changed
- Header insertion and update logic now handles shebangs properly for Python files

## [1.0.4] - 2026-01-30

### Added
- Packaging documentation in README

### Changed
- Updated extension name and description for better distinctiveness

## [1.0.3] - 2026-01-27

### Added
- Dependencies (ovsx) to publish on OpenVSX

### Fixed
- Header more space for "FILENAME" & "AUTHOR"
- URL to the Github Issues Page

## [1.0.2] - 2026-01-27

### Changed
-  Updated the package.json Metadata

## [1.0.1] - 2026-01-27

### Changed
- Updated Python header template formatting for better consistency

## [1.0.0] - 2026-01-27

### Added
- Python flake8 compliant header (79 characters)
- Modern dependencies (Node 20+ support)
- Installation scripts for 42 schools (without npm)
- Comprehensive documentation

### Changed
- Updated from deprecated `vscode` module to `@types/vscode`
- Improved TypeScript configuration
- Enhanced package.json metadata

### Fixed
- Header extraction for both 79 and 80 character formats
- Compatibility with modern VSCode versions

## Credits

Based on [vscode-42header](https://github.com/kube/vscode-42header) by kube
