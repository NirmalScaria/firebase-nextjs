import { spawn } from 'child_process';
import inquirer from 'inquirer';
import path from 'path';

function runFirebaseLogout() {
  return new Promise((resolve, reject) => {
    const firebaseLogout = spawn('firebase', ['logout'], { stdio: 'inherit' });

    firebaseLogout.on('error', (error) => {
      reject(`Error: ${error.message}`);
    });

    firebaseLogout.on('close', (code) => {
      if (code === 0) {
        resolve('Firebase logout successful!');
      } else {
        reject(`Firebase logout failed with code ${code}`);
      }
    });
  });
}

function runFirebaseLogin() {
  return new Promise((resolve, reject) => {
    const firebaseLogin = spawn('firebase', ['login'], { stdio: 'inherit' });

    firebaseLogin.on('error', (error) => {
      reject(`Error: ${error.message}`);
    });

    firebaseLogin.on('close', (code) => {
      if (code === 0) {
        resolve('Firebase login successful!');
      } else {
        reject(`Firebase login failed with code ${code}`);
      }
    });
  });
}

function getProjects() {
  return new Promise((resolve, reject) => {
    const firebaseProjects = spawn('firebase', ['projects:list'], { stdio: 'pipe' });

    let projects = '';

    firebaseProjects.stdout.on('data', (data) => {
      projects += data.toString();
    });

    firebaseProjects.on('error', (error) => {
      reject(`Error: ${error.message}`);
    });

    firebaseProjects.on('close', (code) => {
      if (code === 0) {
        resolve(projects);
      } else {
        reject(`Firebase projects failed with code ${code}`);
      }
    });
  });
}

function formatProjects(projects) {
  var projectsList = projects.split('\n');

  projectsList = projectsList.filter((project) => project.match(/[a-z]/i));
  projectsList = projectsList.map((project) => project.split('│'));
  projectsList = projectsList.map((project) => project.filter((item) => item.trim()));
  projectsList = projectsList.map((project) => project.map((item) => item.trim()));
  projectsList = projectsList.map((project) => {
    return {
      displayName: project[0],
      projectId: project[1],
      projectNumber: project[2],
    }
  })

  projectsList.shift();
  projectsList.pop();

  return projectsList;
}

async function selectProject(projects) {
  const projectChoices = projects.map((project) => {
    return {
      name: project.displayName + '(' + project.projectId + ')',
      value: project.projectId,
    }
  });

  const selectedProject = await inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      message: 'Select a project',
      choices: projectChoices,
    }
  ]);

  return selectedProject.project;
}



async function setProject(projectId) {
  return new Promise((resolve, reject) => {
    const firebaseUse = spawn('gcloud', ['config', 'set', 'project', projectId], { stdio: 'inherit' });

    firebaseUse.on('error', (error) => {
      reject(`Error: ${error.message}`);
    });

    firebaseUse.on('close', (code) => {
      if (code === 0) {
        resolve('Firebase project set successfully!');
      } else {
        reject(`Firebase project set failed with code ${code}`);
      }
    });
  });
}

async function getSAmail() {
  return new Promise((resolve, reject) => {
    const firebaseProjects = spawn('gcloud', ['iam', 'service-accounts', 'list'], { stdio: 'pipe' });

    let output = '';

    firebaseProjects.stdout.on('data', (data) => {
      output += data.toString();
    });

    firebaseProjects.on('error', (error) => {
      reject(`Error: ${error.message}`);
    });

    firebaseProjects.on('close', (code) => {
      if (code === 0) {
        resolve(output)
      } else {
        reject(`Firebase projects failed with code ${code}`);
      }
    });
  });
}

function formatMails(mailsString) {
  var mails = mailsString.split('\n');
  mails.shift();
  mails = mails.map((mail) => mail.split(' '));
  mails = mails.map((mail) => mail.filter((item) => item.trim()));
  mails = mails.map((mail) => {
    const disabled = mail.pop();
    const email = mail.pop();
    const displayName = mail.join(' ');
    return {
      displayName,
      email,
      disabled,
    }
  })
  // remove if email does not exist
  mails = mails.filter((mail) => mail.email);
  return mails;
}

async function selectMail(mails) {
  // If there is one with displayName "firebase-adminsdk" select that by default

  const defaultMail = mails.find((mail) => mail.displayName === 'firebase-adminsdk');
  if (defaultMail) {
    mails = mails.filter((mail) => mail.displayName !== 'firebase-adminsdk');
    mails.unshift(defaultMail);
  }
  const mailChoices = mails.map((mail) => {
    return {
      name: mail.displayName + ' (' + mail.email + ')',
      value: mail.email,
    }
  });

  const selectedMail = await inquirer.prompt([
    {
      type: 'list',
      name: 'mail',
      message: 'Select a service account',
      choices: mailChoices,
    }
  ]);

  return selectedMail.mail;
}

async function storeKey(email, location) {
  return new Promise((resolve, reject) => {
    const firebaseProjects = spawn('gcloud', ['iam', 'service-accounts', 'keys', 'create', location, '--iam-account', email], { stdio: 'pipe' });

    firebaseProjects.on('error', (error) => {
      reject(`Error: ${error.message}`);
    });

    firebaseProjects.on('close', (code) => {
      if (code === 0) {
        resolve('Key stored successfully!')
      } else {
        reject(`Key store failed with code ${code}`);
      }
    });
  });

}

async function main() {
  try {
    await runFirebaseLogout();
    await runFirebaseLogin();


    const projectsList = await getProjects();
    const projects = formatProjects(projectsList);
    const selectedProject = await selectProject(projects);
    const projectResult = await setProject(selectedProject);

    const mailsUnformatted = await getSAmail();
    const mails = formatMails(mailsUnformatted);
    const selectedMail = await selectMail(mails);

    const rootPath = path.join(process.cwd(), "../../");

    const location = path.join(rootPath, "firebase-service-account.json");

    const keyStored = await storeKey(selectedMail, location);

    console.log("SELECTED: ", selectedMail)
  } catch (error) {
    console.error(error);
  }
}

main();
