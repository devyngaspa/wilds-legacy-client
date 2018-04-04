import whelp from './base'

export default {

  find: function (obj, ...args) {
    if (args.length === 0) { return obj }
    let prop = args[0]
    if (obj[prop] === undefined) { return undefined }
    return whelp.object.find(obj[prop], ...args.slice(1))
  }

}
