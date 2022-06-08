const fs = require('fs')
const factory = require('rdf-ext')
const ParserN3 = require('@rdfjs/parser-n3')
const SHACLValidator = require('rdf-validate-shacl')

const datafile = process.argv[2]
const shapefile = process.argv[3]

async function loadDataset (filePath) {
  const stream = fs.createReadStream(filePath)
  const parser = new ParserN3({ factory })
  return factory.dataset().import(parser.import(stream))
}

async function main() {
  const shapes = await loadDataset(shapefile)
  const data = await loadDataset(datafile)

  const validator = new SHACLValidator(shapes, { factory })
  const report = await validator.validate(data)

  // Check conformance: `true` or `false`
  console.log(report.conforms
    ? ":) Nice, the data CONFORMS to the shapes"
    : ":( Oops, the data does NOT CONFORM to the shapes\n")

  for (const result of report.results) {
    console.log(`Focus Node: ${result.focusNode}
        Path:    ${result.path}
        Message: ${result.message}
    `)
  }

    // Validation report as RDF dataset
    // console.log(report.dataset)

}

main();