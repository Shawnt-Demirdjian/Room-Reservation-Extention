// On click Start Button
$("#start").on("click", () => {
	// TODO: validate form
	// set form data
	chrome.storage.local.set({
		form: {
			personIndex: $("input[name=people]:checked").val(),
			startDate: $("#start-time").val(),
			length: $("#length").val(),
			room: $("#room").val()
		}
	}, function () {
		// open new tab
		chrome.tabs.create({
			url: "https://sdsu.libcal.com/reserve/24-7-area",
			active: false
		}, (newTab) => {
			chrome.storage.local.set({
				"currTab": newTab.id
			});
		});
	});
});

$(document).ready(() => {
	chrome.storage.sync.get(['people'], function (result) {
		let checked = "";
		if (result.people.length == 0) {
			// no saved people
			$("#people").append(`<span>You have no saved people yet.</span>`);
		}
		result.people.forEach((element, index) => {
			if (!index) {
				checked = "checked"
			}
			$("#people").append(`
				<div class='person'>
					<input type="radio" id="${element.first}" value="${index}" name="people" ${checked}>
					${element.first}
					<br>
					${element.last}
					<br>
					${element.email}
					<br>
					${element.redID}
				</div>
			`);
		});
	});
});