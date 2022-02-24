// console.log(process.env)

const { resolve } = require('path')
const { existsSync } = require('fs')

const url= require('url')


const resolvePathToFile = (cwd = process.cwd(), toPath = `/`) => {
  //const {
  //  resolve
  //} = require(`node:path`)
  
  let resolvedPath
  try {
    resolvedPath = resolve(cwd, toPath)

    if(process.env.NODE_DEBUG_SANDBOX === `resolvePathToFile`) {
      console.log(`[DEBUG:resolvePathToFile] resolved path`)
      console.log(``)
      console.log(`- FROM:`)
      console.log(cwd)
      console.log(``)
      console.log(`- TO:`)
      console.log(toPath)
      console.log(`----------------`)
      console.log(`* Function: resolve(cwd, toPath)`)
      console.log(resolvedPath)
      console.log(`----------------`)
    }

    return resolvedPath
  }
  catch(err) {
    throw err
  }
}


const verifyPathExists = (pathToVerify = null) => {
  // const {
  //  existsSync
  //} = require('node:fs')

  let _path_

  let flag = null

  try {
    _path_ = pathToVerify

    if(_path_ === null) {
       throw Error(`Function: verifyPathExists(argv0) - Expected argument value as input for argv0 NOT equal null but that's what I got.`)
    }

    if(typeof _path_ !== `string`) {
      throw Error(`Function: verifyPathExists(argv0) - Expected argument value as input for argv0 to be typeof "string". Recieved: ${typeof _path_}`)
    }

    if(flag === null) {
      flag = false

      if(existsSync(_path_)) {
        if(process.env.NODE_DEBUG_SANDBOX === `verifyPathExists`) {
          console.log('Path exists!')
          console.log(`Path Checked:`)
          console.log(_path_)
        }
      
        flag = true 
      } 
      else {
        if(process.env.NODE_DEBUG_SANDBOX === `verifyPathExists`) {
          console.log('Path NOT existing!')
          console.log(`Path Checked:`)
          console.log(_path_)
        }

        flag = false
      }
    }

    if(typeof flag !== `boolean`) {
      throw Error(`Function: verifyPathExists(argv0) -> existsSync(argv0) => Expected return value to be typeof "boolean". 
                    Recieved:
                     - typeof => ${typeof flag}
                     - value => ${flag}
                 `)
    }
    

    return {
      pathValue: _path_,
      doesExist: flag,
      requireInternal: () => resolve(_path_)
    }
  }
  catch(err) {
    throw err
  }
}


const ESM_TOKEN_STRING = `esm`
const ESM_TOKEN_SYMBOL = Symbol(ESM_TOKEN_STRING)

const CJS_TOKEN_STRING = `cjs`
const CJS_TOKEN_SYMBOL = Symbol(CJS_TOKEN_STRING)

const DEFAULT_TOKEN_STRING = `default`
const DEFAULT_TOKEN_SYMBOL = Symbol(DEFAULT_TOKEN_STRING)

 
let resolveAsNodeModuleType = process.env.NODE_MODULE_TYPE || null
let __node_type_token__ = null 


if(typeof __node_type_token__ !== `symbol`) {
  if(resolveAsNodeModuleType !== null) {
    // __node_type_token__ = Symbol(resolveAsNodeModuleType)
    switch(resolveAsNodeModuleType) {
      case ESM_TOKEN_SYMBOL.description:
        __node_type_token__ = ESM_TOKEN_SYMBOL
        break;
      case CJS_TOKEN_SYMBOL.description:
        __node_type_token__ = CJS_TOKEN_SYMBOL
        break;
      case DEFAULT_TOKEN_SYMBOL.description:
        __node_type_token__ = DEFAULT_TOKEN_SYMBOL
        break;
    }
  }
  else {
    throw Error(`Env variable "NODE_MODULE_TYPE" returned ${process.env.NODE_MODULE_TYPE}. Expected either
                 [ ${ESM_TOKEN_STRING}, ${CJS_TOKEN_STRING}, or ${DEFAULT_TOKEN_STRING} ] to be present when process.env check is made.`)
  }
}

const DirnameESMInterop = (__DIRNAME__ = null) => {
  // import url from 'url'

  let dirname

  try {
   // dirname = __DIRNAME__

   // console.log(typeof __dirname)

   // dirname = url.fileURLToPath(new URL(".", import.meta.url))
   
   dirname = __dirname

   if(process.env.NODE_DEBUG_SANDBOX === `DirnameESMInterop`) {
     console.log(`Resolved DIRNAME:`)
     console.log(dirname)
   }

   return dirname
  }
  catch(err) {
    throw err
  }
}



let DIRNAME = DirnameESMInterop()

const NODE_MODULE_TYPES_MAP = new Map([
 [
   ESM_TOKEN_SYMBOL, [
     resolvePathToFile(DIRNAME, `${ESM_TOKEN_SYMBOL.description}/index.mjs`)  
   ]
 ],
 [
   CJS_TOKEN_SYMBOL, [
     resolvePathToFile(DIRNAME, `${CJS_TOKEN_SYMBOL.description}/index.cjs`)
   ]
 ],
 [
   DEFAULT_TOKEN_SYMBOL, [
     resolvePathToFile(DIRNAME, `${DEFAULT_TOKEN_SYMBOL.description}/index.js`)
   ]
 ]
])







// console.log(NODE_MODULE_TYPES_MAP)
//console.log(__node_type_token__)

//console.log(NODE_MODULE_TYPES_MAP.get(__node_type_token__))

let internalPath = NODE_MODULE_TYPES_MAP.get(__node_type_token__)[0]
// console.log(internalPath)

const {
  pathValue,
  doesExist,
  requireInternal
} = verifyPathExists(internalPath)

// console.log(pathValue)
// console.log(doesExist)
// console.log(requireInternal())

module.exports = require(requireInternal())
