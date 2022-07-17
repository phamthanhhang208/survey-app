const { admin } = require("../firebase");

async function setClaimsForUser() {
	const { users } = await admin.auth().listUsers();
	for (const user of users) {
		if (user.email.includes("teacher.name")) {
			await admin.auth().setCustomUserClaims(user.uid, { role: "teacher" });
		} else {
			await admin.auth().setCustomUserClaims(user.uid, { role: "student" });
		}
	}
}

setClaimsForUser();
