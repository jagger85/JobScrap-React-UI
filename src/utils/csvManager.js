/**
 * Default headers for job listing CSV exports
 * @type {string[]}
 */
const JOB_LISTING_HEADERS = [
  'site',
  'job_title',
  'company',
  'location',
  'salary',
  'employment_type',
  'position',
  'listing_date',
  'description',
  'url'
]

/**
 * Escapes special characters in CSV fields and wraps in quotes if needed
 * @param {string|number|null|undefined} field - The field to escape
 * @returns {string} Escaped and properly formatted CSV field
 */
function escapeCSVField(field) {
  if (field === null || field === undefined) {
    return ''
  }
  
  const stringField = String(field)
  if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
    return `"${stringField.replace(/"/g, '""')}"`
  }
  return stringField
}

/**
 * Converts JSON data to CSV string format
 * @param {Object[]} jsonData - Array of objects to convert to CSV
 * @param {string[]} columnHeaders - Array of header keys to extract from objects
 * @returns {string} CSV formatted string with headers and data rows
 * @throws {Error} If jsonData or columnHeaders are not arrays or if jsonData is empty
 */
function convertJSONToCSV(jsonData, columnHeaders) {
  if (!Array.isArray(jsonData) || !Array.isArray(columnHeaders)) {
    throw new Error('Invalid input: jsonData and columnHeaders must be arrays')
  }

  if (jsonData.length === 0) {
    return ''
  }

  const headers = columnHeaders.map(escapeCSVField).join(',') + '\n'

  const rows = jsonData
    .map((row) => {
      return columnHeaders
        .map((field) => escapeCSVField(row[field]))
        .join(',')
    })
    .join('\n')

  return headers + rows
}

/**
 * Creates and initiates download of CSV file
 * Handles file creation, download triggering, and cleanup
 * @param {Object[]} jsonData - Array of objects to convert to CSV
 * @param {string[]} [headers=JOB_LISTING_HEADERS] - Optional array of header keys
 * @param {string} [filename='export'] - Optional custom filename prefix
 * @returns {Promise<void>} Resolves when download is complete
 * @throws {Error} If CSV creation fails or if there's no data to export
 */
export async function downloadCSV(jsonData, headers = JOB_LISTING_HEADERS, filename = 'export') {
  return new Promise((resolve, reject) => {
    try {
      console.log('Creating CSV data...')
      const csvData = convertJSONToCSV(jsonData, headers)

      if (csvData === '') {
        throw new Error('No data to export')
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const fullFilename = `${filename}_${timestamp}.csv`
      
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fullFilename)
      link.style.display = 'none'
      
      document.body.appendChild(link)
      console.log('Triggering download...')
      link.click()
      
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        console.log('Download cleanup completed')
        resolve()
      }, 500)
    } catch (error) {
      console.error('CSV download failed:', error)
      reject(error)
    }
  })
}

export { convertJSONToCSV, escapeCSVField, JOB_LISTING_HEADERS }
