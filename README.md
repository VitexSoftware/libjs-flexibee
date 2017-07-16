# libjs-flexibee
JavaScript Based Library for easy interaction with czech accounting system FlexiBee. 


## Configuration 

We use simple JSON configuration file:


```json
{
    "FLEXIBEE_URL": "https://demo.flexibee.eu",
    "FLEXIBEE_LOGIN": "winstrom",
    "FLEXIBEE_PASSWORD": "winstrom",
    "FLEXIBEE_COMPANY": "demo",
    "FLEXIBEE_UNSAFE": "true"
}
```

Config keys:

  * FLEXIBEE_URL              - protocol://host[:portnumber]
  * FLEXIBEE_LOGIN           - flexibee username of api user
  * FLEXIBEE_PASSWORD   - flexibee user password
  * FLEXIBEE_COMPANY     - default company (dbNazev column from /c.json )
  * FLEXIBEE_UNSAFE        - allow to connect with default **selfsigned** FlexiBee certificate



FlexiBee libraries for other languages:
-------------------------------------------------------

 * [FlexiPeeHP](https://github.com/Spoje-NET/FlexiPeeHP) (PHP)
 * [Flexipy](https://github.com/JakubJecminek/flexipy)  (Python) [Documentation](http://pythonhosted.org/flexipy/index.html)
 * [Flexibee.rb](https://github.com/danpecher/flexibee.rb) (Ruby)


 