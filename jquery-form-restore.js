(function ($) {
	$.fn.restoreFormValues = function (values) {
		var form = this;

		$.each(values, function (index, item) {
			var $elem = form.find('[name="' + item.name + '"]');

			if ($elem.is(':checkbox')) {
				$elem.prop('checked', Boolean(item.value));
			} else if ($elem.is(':radio')) {
				if (!item.value) {
					$elem.prop('checked', false);
				} else {
					$elem.filter('[value="' + item.value + '"]').prop('checked', true);
				}
			} else {
				$elem.val(item.value);
			}
		});
	};

	$.fn.getFormValues = function () {
		var values = this.serializeArray(),
			form = this,
			radios;

		this.find(':checkbox:not(:checked,:disabled)').each(function (index, elem) {
			var $elem = $(elem),
				elemName = $elem.attr('name');

			if (elemName) {
				values.push({
					name: elemName,
					value: false
				});
			}
		});

		radios = {};
		this.find(':radio:not(:checked)').each(function (index, elem) {
			var $elem = $(elem),
				elemName = $elem.attr('name');

			if (elemName) {
				if (form.find('[name="' + elemName + '"]:checked').length < 1) {
					radios[elemName] = false;
				}
			}
		});

		$.each(radios, function (name) {
			values.push({
				name: name,
				value: false
			});
		});

		return values;
	};
}(window.jQuery));
