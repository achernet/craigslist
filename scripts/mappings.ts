
/*
  Mappings

  Mappings are matchers that we use to determine if we should execute a
  bit of Tritium during an execution. Aka, run something when we are
  are on a certain page.

  Example starting code:
*/

match($status) {

  with(/302/) {
    log("--> STATUS: 302")
    # redirect: just let it go through
  }

  with(/200/) {
    log("--> STATUS: 200")
    
    # Here we match particular paths with regex and point the page 
    # to a specific Tritium file
    match($path) {
      # The following Regex specifies an URL without 
      # a path (i.e. the "home" url)
      with(/^\/$/) {
        # Include a log with every import to make it simple to know what scripts are running
        log("--> Importing pages/homes.ts in mappings.ts")
        @import "pages/home.ts"
      }
      # The following imports have no Tritium; they are set up
      # for illustrative purposes
      with(/\d{6}/) {
        log("--> Importing pages/item.ts in mappings.ts")
        @import "pages/item.ts"
      }
      with(/\w{3}/) {
        log("--> Importing pages/listing.ts in mappings.ts")
        @import "pages/listing.ts"
      }
      else() {
        log("--> Importing pages/not_homes.ts in mappings.ts")
        # @import "pages/not_home.ts"
      }
    } //$path
  } //200

  else() {
    // not 200 or 302 response status
    @import "pages/error.ts"
  }

} //$status

