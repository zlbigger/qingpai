from pathlib import Path
import json
import zipfile
root = Path(__file__).resolve().parent.parent
version = json.loads((root / 'manifest.json').read_text())['version']
output = root / 'dist' / f'qingpai-extension-{version}.zip'
output.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in ['manifest.json', 'content.js', 'page-bridge.js', 'background.js']:
        archive.write(root / 'extension' / name, name)
    archive.write(root / 'extension' / 'README.md', 'README.md')
    archive.write(root / 'LICENSE', 'LICENSE')
print(output)
