import * as joi from 'joi';

interface EnvVars {
  VITE_API_URL: string;
}

const envsSchema = joi.object<EnvVars>({
  VITE_API_URL: joi.string().uri().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(import.meta.env);

if (error) {
  throw new Error(`❌ Config validation error: ${error.message}`);
}

export const envs = {
  apiUrl: value.VITE_API_URL,
};
