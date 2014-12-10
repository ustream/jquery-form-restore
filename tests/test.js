/*global suite, setup, teardown, suite, assert*/

suite('jQuery form restore', function () {
	var form, $ = window.jQuery;
	setup(function () {
		form = $('#MyAwesomeForm');
	});
	teardown(function () {
		form[0].reset();
	});
	suite('getFormValues', function () {
		test('returns array', function () {
			assert.isArray(form.getFormValues());
		});

		test('array has all the elements', function () {
			assert.lengthOf(form.getFormValues(), 3);
		});

		test('array has elements in {name: "name", value: "value"}', function () {
			var values = form.getFormValues();

			values.forEach(function (item) {
				assert.property(item, 'name');
				assert.property(item, 'value');
			});
		});

		test('array elements has correct values', function () {
			var values = form.getFormValues(), item;

			item = values.filter(function (item) {
				return item.name === 'a';
			});

			assert.lengthOf(item, 1);
			assert.equal(item[0].value, 'Foo');

			item = values.filter(function (item) {
				return item.name === 'b';
			});

			assert.lengthOf(item, 1);
			assert.isFalse(item[0].value);

			item = values.filter(function (item) {
				return item.name === 'c';
			});

			assert.lengthOf(item, 1);
			assert.equal(item[0].value, false);
		});

		test('array elements has correct values after change', function () {
			var values, item;

			form.find('[name="a"]').val('FooBar');
			form.find('[name="b"][value="A"]').prop('checked', true);
			form.find('[name="c"]').prop('checked', true);

			values = form.getFormValues();

			item = values.filter(function (item) {
				return item.name === 'a';
			});

			assert.lengthOf(item, 1);
			assert.equal(item[0].value, 'FooBar');

			item = values.filter(function (item) {
				return item.name === 'b';
			});

			assert.lengthOf(item, 1);
			assert.equal(item[0].value, 'A');

			item = values.filter(function (item) {
				return item.name === 'c';
			});

			assert.lengthOf(item, 1);
			assert.equal(item[0].value, 'Bar');
		});
	});

	suite('restoreFormValues', function () {
		test('restores original values', function () {
			var values, item;

			values = form.getFormValues();

			form.find('[name="a"]').val('FooBar');
			form.find('[name="b"][value="A"]').prop('checked', true);
			form.find('[name="c"]').prop('checked', true);

			form.restoreFormValues(values);

			item = values.filter(function (item) {
				return item.name === 'a';
			});

			assert.lengthOf(item, 1);
			assert.equal(item[0].value, 'Foo');

			item = values.filter(function (item) {
				return item.name === 'b';
			});

			assert.lengthOf(item, 1);
			assert.isFalse(item[0].value);

			item = values.filter(function (item) {
				return item.name === 'c';
			});

			assert.lengthOf(item, 1);
			assert.equal(item[0].value, false);
		});
		test('restores changed values', function () {
			var values, item;

			form.find('[name="a"]').val('FooBar');
			form.find('[name="b"][value="A"]').prop('checked', true);
			form.find('[name="c"]').prop('checked', true);

			values = form.getFormValues();

			form.find('[name="a"]').val('FooBarBaz');
			form.find('[name="b"][value="B"]').prop('checked', true);
			form.find('[name="c"]').prop('checked', false);

			form.restoreFormValues(values);

			item = values.filter(function (item) {
				return item.name === 'a';
			});

			assert.lengthOf(item, 1);
			assert.equal(item[0].value, 'FooBar');

			item = values.filter(function (item) {
				return item.name === 'b';
			});

			assert.lengthOf(item, 1);
			assert.equal(item[0].value, 'A');

			item = values.filter(function (item) {
				return item.name === 'c';
			});

			assert.lengthOf(item, 1);
			assert.equal(item[0].value, 'Bar');
		});
	});
});
