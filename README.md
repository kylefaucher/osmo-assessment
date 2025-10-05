## Approach

My approach was to first look at the data file, and determine the type structure that the csv data should map to. I created a type for perfumeFormula, which contains formula-specific values as well as an array of type perfumeMaterial with material-specific values. I then determined which states would be needed, which were the CSV data, search term, sort-by value, and the currently expanded formula.

With more time, I might break down the current FormulasTable component into smaller components to further separate concerns, including a Search component. In the App component, I could also pull the fetching logic into a separate custom hook. 


## Assumptions and tradeoffs

The UI assumes that formulas will be relatively short. In real-world cases where formulas are much longer, it may be more user friendly to display complete formulas in a side panel or modal. 

I quickly added styling in a plain CSS file using classnames in components, but in a more complex app it would be beneficial to use CSS modules or a framework like tailwind. 