const { program } = require('commander');
const { readFile, writeFile, stat } = require('fs').promises;

// Static configurations ==========================================================
const envForTaskDefReplacement = ['AWS_ACCOUNT_ID', 'IMAGE_TAG'];

const envForContainer = [
  'SELF_DOMAIN',
  'AUTH_GOOGLE_ID',
  'WHATSAPP_AUTHORIZATION_TOKEN',
  'AUTH_GOOGLE_SECRET',
  'MONGO_CONNECTION_URI',
  'BISHAL_SWING_DB',
  'WHATSAPP_SENDER_PHONE_NUMBER_ID',
  'AUTH_SECRET',
];
// ================================================================================

// Program definition =============================================================
const run = async () => {
  // Start program, get options, and validate environment variables
  program
    .version('1.0.0', '-v, --version')
    .usage('[OPTIONS]...')
    .option(
      '-t, --template <value>',
      'Template file to use for task definition',
      './aws/task-definition-template.json',
    )
    .option(
      '-o, --output <value>',
      'Output file for the task definition',
      './aws/task-definition.json',
    )
    .parse(process.argv);
  const cliOptions = program.opts();

  const fileExist = await stat(cliOptions.template)
    .then(() => true)
    .catch(() => false);
  if (!fileExist)
    throw new Error(`Template file not found: ${cliOptions.template}`);

  const missingEnv = [...envForTaskDefReplacement, ...envForContainer].filter(
    env => !process.env[env],
  );
  if (missingEnv.length > 0) {
    throw new Error(`Missing environment variables: ${missingEnv.join(', ')}`);
  }

  const templateFile = cliOptions.template;
  const outputFile = cliOptions.output;

  // Perform replacements in the task definition template and parse it
  const taskDefTemplate = await readFile(templateFile, 'utf8');
  const taskDefContent = envForTaskDefReplacement.reduce((content, env) => {
    const regex = new RegExp(`{{${env}}}`, 'g');
    return content.replace(regex, process.env[env]);
  }, taskDefTemplate);
  const taskDefinition = JSON.parse(taskDefContent);

  // Update container definitions with environment variables
  taskDefinition.containerDefinitions.forEach(container => {
    container.environment = container.environment || [];
    envForContainer.forEach(env => {
      const value = process.env[env];
      if (value) {
        const existingEnv = container.environment.find(e => e.name === env);
        if (existingEnv) {
          existingEnv.value = value;
        } else {
          container.environment.push({ name: env, value });
        }
      }
    });
  });

  // Write the final task definition to the output file
  await writeFile(outputFile, JSON.stringify(taskDefinition, null, 2), 'utf8');

  return;
};
// =================================================================================

// Actual code execution ===========================================================
run()
  .then(() => {
    console.log('[>] Task definition created successfully.');
    process.exit(0);
  })
  .catch(e => {
    console.error('[!] Error creating task definition:', e);
    process.exit(1);
  });
// ================================================================================
