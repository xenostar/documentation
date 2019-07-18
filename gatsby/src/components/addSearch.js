import React from "react"

const AddSearch = () => {
    return (
        <>
        <form 
            id="searchform"
            accept-charset="UTF-8"
            enctype="application/x-www-form-urlencoded"
            action="/search"
        >

            <input 
                type="search"
                className="addsearch" 
                disabled="disabled" 
                placeholder="Search Pantheon Documentation" 
                data-addseach-field="true"
                style={{cursor: "auto"}}
            />

            <script 
                src="https://addsearch.com/js/?key=a7b957b7a8f57f4cc544c54f289611c6"
            >
            </script>

        </form>

        <span
            className="glyphicon glyphicon-search form-control-feedback"
            aria-hidden="true"
        />
        <span className="sr-only">(search)</span>

        </>
    )
}

export default AddSearch