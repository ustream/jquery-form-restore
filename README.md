# jQuery form restore

Get and restore form values (even checkbox checked state) with jquery

Store form values in a variablue, if you may need to restore them later
```javascript
var formValues = $('#MyAwesomeForm').getFormValues();
```

Then restore the values when needed:
```javascript
$('#MyAwesomeForm').restoreFormValues(formValues);
```
