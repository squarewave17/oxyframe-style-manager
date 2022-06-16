import { useSelectorStore } from '@/store/selectorStore'

export default function FileSystem() {
  const selectorStore = useSelectorStore()
  const fileOptions = {
    types: [
      {
        description: 'JSON',
        accept: {
          'application/json': ['.json'],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  }
  const saveData = async (data) => {
    const newHandle = await window.showSaveFilePicker(fileOptions)
    const writableStream = await newHandle.createWritable()
    await writableStream.write(data)
    await writableStream.close()
  }

  const loadData = async () => {
    let fileHandle
    ;[fileHandle] = await window.showOpenFilePicker(fileOptions)
    const fileData = await fileHandle.getFile()
    const fileContents = await fileData.text()
    return fileContents
  }
  return {
    saveData,
    loadData,
  }
}
