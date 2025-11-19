import { useState, useCallback } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

/**
 * Opções de configuração para o hook useForm
 */
interface UseFormOptions<T> {
  initialValues: T;
  validate: (values: T) => Record<string, string>;
  onSubmit: (values: T) => void | Promise<void>;
}

/**
 * Retorno do hook useForm
 */
interface UseFormReturn<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (field: keyof T) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (e: FormEvent) => void;
  isValid: boolean;
  isSubmitting: boolean;
  resetForm: () => void;
  setFieldValue: (field: keyof T, value: unknown) => void;
}

/**
 * Custom hook para gerenciamento de formulários com validação
 * Gerencia valores, erros, campos tocados e submissão
 *
 * @param options - Configurações do formulário
 * @returns Objeto com estado e handlers do formulário
 *
 * @example
 * const { values, errors, touched, handleChange, handleBlur, handleSubmit, isValid } = useForm({
 *   initialValues: { email: '', password: '' },
 *   validate: (values) => {
 *     const errors: Record<string, string> = {};
 *     if (!values.email) errors.email = 'Email é obrigatório';
 *     if (!values.password) errors.password = 'Senha é obrigatória';
 *     return errors;
 *   },
 *   onSubmit: async (values) => {
 *     await loginUser(values);
 *   }
 * });
 */
function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  // Estado dos valores do formulário
  const [values, setValues] = useState<T>(initialValues);

  // Estado dos erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Estado dos campos que foram tocados (blur)
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Estado de submissão
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Valida os valores e retorna se o formulário é válido
  const validateForm = useCallback(
    (formValues: T): boolean => {
      const validationErrors = validate(formValues);
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    },
    [validate]
  );

  // Handler para mudanças nos campos
  const handleChange = useCallback(
    (field: keyof T) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      const newValues = { ...values, [field]: newValue };
      setValues(newValues);

      // Valida em tempo real se o campo já foi tocado
      if (touched[field as string]) {
        validateForm(newValues);
      }
    },
    [values, touched, validateForm]
  );

  // Handler para quando o campo perde o foco
  const handleBlur = useCallback(
    (field: keyof T) => () => {
      setTouched({ ...touched, [field]: true });
      // Valida o formulário quando o campo perde o foco
      validateForm(values);
    },
    [touched, values, validateForm]
  );

  // Handler para submissão do formulário
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Marca todos os campos como tocados
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);

      // Valida o formulário
      const isValid = validateForm(values);

      if (isValid) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [values, validateForm, onSubmit]
  );

  // Função para resetar o formulário
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Função para definir valor de um campo específico
  const setFieldValue = useCallback(
    (field: keyof T, value: unknown) => {
      const newValues = { ...values, [field]: value };
      setValues(newValues);

      // Valida se o campo já foi tocado
      if (touched[field as string]) {
        validateForm(newValues);
      }
    },
    [values, touched, validateForm]
  );

  // Calcula se o formulário é válido
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    resetForm,
    setFieldValue,
  };
}

export default useForm;
