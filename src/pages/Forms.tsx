import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import useForm from '../hooks/useForm';
import { validateEmail, validatePassword, validatePasswordMatch, validateUsername, validateMinLength } from '../utils/validators';
import type { LoginFormData, ContactFormData, RegistrationFormData } from '../types';
import styles from './Forms.module.css';

/**
 * Forms page - Demonstra 3 formulários com validação usando useForm
 */
function Forms() {
  const [activeForm, setActiveForm] = useState<'login' | 'contact' | 'registration'>('login');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  // Helper function to determine input class based on validation state
  const getInputClass = (touched: boolean, error: string | undefined, value: string) => {
    if (!touched) return styles.input;
    if (error) return `${styles.input} ${styles.inputError}`;
    if (value && value.trim().length > 0) return `${styles.input} ${styles.inputSuccess}`;
    return styles.input;
  };

  // Login Form
  const loginForm = useForm<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      const emailError = validateEmail(values.email);
      if (emailError) errors.email = emailError;

      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitMessage(`✅ Login realizado com sucesso! Email: ${values.email}`);
      setTimeout(() => setSubmitMessage(''), 5000);
    },
  });

  // Contact Form
  const contactForm = useForm<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.name || values.name.trim().length === 0) {
        errors.name = 'Name is required';
      } else if (values.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }

      const emailError = validateEmail(values.email);
      if (emailError) errors.email = emailError;

      const messageError = validateMinLength(values.message, 10, 'Message');
      if (messageError) errors.message = messageError;

      return errors;
    },
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitMessage(`✅ Mensagem enviada com sucesso! Entraremos em contato em breve.`);
      contactForm.resetForm();
      setTimeout(() => setSubmitMessage(''), 5000);
    },
  });

  // Registration Form
  const registrationForm = useForm<RegistrationFormData>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: (formValues) => {
      const errors: Record<string, string> = {};

      const usernameError = validateUsername(formValues.username);
      if (usernameError) errors.username = usernameError;

      const emailError = validateEmail(formValues.email);
      if (emailError) errors.email = emailError;

      const passwordError = validatePassword(formValues.password);
      if (passwordError) errors.password = passwordError;

      const confirmError = validatePasswordMatch(formValues.password, formValues.confirmPassword);
      if (confirmError) errors.confirmPassword = confirmError;

      return errors;
    },
    onSubmit: async (formValues) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitMessage(`✅ Conta criada com sucesso! Bem-vindo, ${formValues.username}!`);
      registrationForm.resetForm();
      setTimeout(() => setSubmitMessage(''), 5000);
    },
  });

  return (
    <div className={styles.forms}>
      <header className={styles.header}>
        <Link to="/">
          <Button variant="secondary" size="sm">
            ← Voltar
          </Button>
        </Link>
        <h1>Formulários</h1>
        <p>Exemplos de formulários com validação em tempo real usando useForm hook</p>
      </header>

      {submitMessage && (
        <div className={styles.submitSuccessMessage}>
          {submitMessage}
        </div>
      )}

      <div className={styles.formTabs}>
        <button
          className={`${styles.tab} ${activeForm === 'login' ? styles.activeTab : ''}`}
          onClick={() => setActiveForm('login')}
        >
          Login
        </button>
        <button
          className={`${styles.tab} ${activeForm === 'contact' ? styles.activeTab : ''}`}
          onClick={() => setActiveForm('contact')}
        >
          Contato
        </button>
        <button
          className={`${styles.tab} ${activeForm === 'registration' ? styles.activeTab : ''}`}
          onClick={() => setActiveForm('registration')}
        >
          Registro
        </button>
      </div>

      <div className={styles.formContainer}>
        {activeForm === 'login' && (
          <Card title="Login Form">
            <form onSubmit={loginForm.handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="login-email">Email:</label>
                <input
                  id="login-email"
                  type="email"
                  value={loginForm.values.email}
                  onChange={loginForm.handleChange('email')}
                  onBlur={loginForm.handleBlur('email')}
                  className={getInputClass(
                    loginForm.touched.email || false,
                    loginForm.errors.email,
                    loginForm.values.email
                  )}
                  placeholder="seu@email.com"
                  aria-invalid={loginForm.touched.email && !!loginForm.errors.email}
                  aria-describedby={loginForm.errors.email ? 'login-email-error' : undefined}
                />
                {loginForm.touched.email && loginForm.errors.email && (
                  <span id="login-email-error" className={styles.errorMessage} role="alert">
                    {loginForm.errors.email}
                  </span>
                )}
                {loginForm.touched.email && !loginForm.errors.email && loginForm.values.email && (
                  <span className={styles.successMessage}>Valid email</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="login-password">Password:</label>
                <input
                  id="login-password"
                  type="password"
                  value={loginForm.values.password}
                  onChange={loginForm.handleChange('password')}
                  onBlur={loginForm.handleBlur('password')}
                  className={getInputClass(
                    loginForm.touched.password || false,
                    loginForm.errors.password,
                    loginForm.values.password
                  )}
                  placeholder="••••••••"
                  aria-invalid={loginForm.touched.password && !!loginForm.errors.password}
                  aria-describedby={loginForm.errors.password ? 'login-password-error' : undefined}
                />
                {loginForm.touched.password && loginForm.errors.password && (
                  <span id="login-password-error" className={styles.errorMessage} role="alert">
                    {loginForm.errors.password}
                  </span>
                )}
                {loginForm.touched.password && !loginForm.errors.password && loginForm.values.password && (
                  <span className={styles.successMessage}>Password entered</span>
                )}
              </div>

              <div className={styles.formActions}>
                <Button
                  type="submit"
                  disabled={!loginForm.isValid || loginForm.isSubmitting}
                  loading={loginForm.isSubmitting}
                >
                  {loginForm.isSubmitting ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {activeForm === 'contact' && (
          <Card title="Contact Form">
            <form onSubmit={contactForm.handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="contact-name">Nome:</label>
                <input
                  id="contact-name"
                  type="text"
                  value={contactForm.values.name}
                  onChange={contactForm.handleChange('name')}
                  onBlur={contactForm.handleBlur('name')}
                  className={getInputClass(
                    contactForm.touched.name || false,
                    contactForm.errors.name,
                    contactForm.values.name
                  )}
                  placeholder="Seu nome"
                  aria-invalid={contactForm.touched.name && !!contactForm.errors.name}
                  aria-describedby={contactForm.errors.name ? 'contact-name-error' : undefined}
                />
                {contactForm.touched.name && contactForm.errors.name && (
                  <span id="contact-name-error" className={styles.errorMessage} role="alert">
                    {contactForm.errors.name}
                  </span>
                )}
                {contactForm.touched.name && !contactForm.errors.name && contactForm.values.name && (
                  <span className={styles.successMessage}>Valid name</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-email">Email:</label>
                <input
                  id="contact-email"
                  type="email"
                  value={contactForm.values.email}
                  onChange={contactForm.handleChange('email')}
                  onBlur={contactForm.handleBlur('email')}
                  className={getInputClass(
                    contactForm.touched.email || false,
                    contactForm.errors.email,
                    contactForm.values.email
                  )}
                  placeholder="seu@email.com"
                  aria-invalid={contactForm.touched.email && !!contactForm.errors.email}
                  aria-describedby={contactForm.errors.email ? 'contact-email-error' : undefined}
                />
                {contactForm.touched.email && contactForm.errors.email && (
                  <span id="contact-email-error" className={styles.errorMessage} role="alert">
                    {contactForm.errors.email}
                  </span>
                )}
                {contactForm.touched.email && !contactForm.errors.email && contactForm.values.email && (
                  <span className={styles.successMessage}>Valid email</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-message">Mensagem:</label>
                <textarea
                  id="contact-message"
                  value={contactForm.values.message}
                  onChange={contactForm.handleChange('message')}
                  onBlur={contactForm.handleBlur('message')}
                  className={getInputClass(
                    contactForm.touched.message || false,
                    contactForm.errors.message,
                    contactForm.values.message
                  )}
                  placeholder="Digite sua mensagem (mínimo 10 caracteres)"
                  rows={5}
                  aria-invalid={contactForm.touched.message && !!contactForm.errors.message}
                  aria-describedby={contactForm.errors.message ? 'contact-message-error' : undefined}
                />
                {contactForm.touched.message && contactForm.errors.message && (
                  <span id="contact-message-error" className={styles.errorMessage} role="alert">
                    {contactForm.errors.message}
                  </span>
                )}
                {contactForm.touched.message && !contactForm.errors.message && contactForm.values.message && (
                  <span className={styles.successMessage}>Valid message</span>
                )}
              </div>

              <div className={styles.formActions}>
                <Button
                  type="submit"
                  disabled={!contactForm.isValid || contactForm.isSubmitting}
                  loading={contactForm.isSubmitting}
                >
                  {contactForm.isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {activeForm === 'registration' && (
          <Card title="Registration Form">
            <form onSubmit={registrationForm.handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="reg-username">Username:</label>
                <input
                  id="reg-username"
                  type="text"
                  value={registrationForm.values.username}
                  onChange={registrationForm.handleChange('username')}
                  onBlur={registrationForm.handleBlur('username')}
                  className={getInputClass(
                    registrationForm.touched.username || false,
                    registrationForm.errors.username,
                    registrationForm.values.username
                  )}
                  placeholder="seu_usuario"
                  aria-invalid={registrationForm.touched.username && !!registrationForm.errors.username}
                  aria-describedby={registrationForm.errors.username ? 'reg-username-error' : 'reg-username-hint'}
                />
                {registrationForm.touched.username && registrationForm.errors.username && (
                  <span id="reg-username-error" className={styles.errorMessage} role="alert">
                    {registrationForm.errors.username}
                  </span>
                )}
                {registrationForm.touched.username && !registrationForm.errors.username && registrationForm.values.username && (
                  <span className={styles.successMessage}>Valid username</span>
                )}
                <span id="reg-username-hint" className={styles.hint}>3-20 caracteres, apenas letras, números, _ e -</span>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reg-email">Email:</label>
                <input
                  id="reg-email"
                  type="email"
                  value={registrationForm.values.email}
                  onChange={registrationForm.handleChange('email')}
                  onBlur={registrationForm.handleBlur('email')}
                  className={getInputClass(
                    registrationForm.touched.email || false,
                    registrationForm.errors.email,
                    registrationForm.values.email
                  )}
                  placeholder="seu@email.com"
                  aria-invalid={registrationForm.touched.email && !!registrationForm.errors.email}
                  aria-describedby={registrationForm.errors.email ? 'reg-email-error' : undefined}
                />
                {registrationForm.touched.email && registrationForm.errors.email && (
                  <span id="reg-email-error" className={styles.errorMessage} role="alert">
                    {registrationForm.errors.email}
                  </span>
                )}
                {registrationForm.touched.email && !registrationForm.errors.email && registrationForm.values.email && (
                  <span className={styles.successMessage}>Valid email</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reg-password">Password:</label>
                <input
                  id="reg-password"
                  type="password"
                  value={registrationForm.values.password}
                  onChange={registrationForm.handleChange('password')}
                  onBlur={registrationForm.handleBlur('password')}
                  className={getInputClass(
                    registrationForm.touched.password || false,
                    registrationForm.errors.password,
                    registrationForm.values.password
                  )}
                  placeholder="••••••••"
                  aria-invalid={registrationForm.touched.password && !!registrationForm.errors.password}
                  aria-describedby={registrationForm.errors.password ? 'reg-password-error' : 'reg-password-hint'}
                />
                {registrationForm.touched.password && registrationForm.errors.password && (
                  <span id="reg-password-error" className={styles.errorMessage} role="alert">
                    {registrationForm.errors.password}
                  </span>
                )}
                {registrationForm.touched.password && !registrationForm.errors.password && registrationForm.values.password && (
                  <span className={styles.successMessage}>Strong password</span>
                )}
                <span id="reg-password-hint" className={styles.hint}>
                  Mínimo 8 caracteres, com maiúscula, minúscula e número
                </span>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reg-confirm-password">Confirm Password:</label>
                <input
                  id="reg-confirm-password"
                  type="password"
                  value={registrationForm.values.confirmPassword}
                  onChange={registrationForm.handleChange('confirmPassword')}
                  onBlur={registrationForm.handleBlur('confirmPassword')}
                  className={getInputClass(
                    registrationForm.touched.confirmPassword || false,
                    registrationForm.errors.confirmPassword,
                    registrationForm.values.confirmPassword
                  )}
                  placeholder="••••••••"
                  aria-invalid={registrationForm.touched.confirmPassword && !!registrationForm.errors.confirmPassword}
                  aria-describedby={registrationForm.errors.confirmPassword ? 'reg-confirm-password-error' : undefined}
                />
                {registrationForm.touched.confirmPassword &&
                  registrationForm.errors.confirmPassword && (
                    <span id="reg-confirm-password-error" className={styles.errorMessage} role="alert">
                      {registrationForm.errors.confirmPassword}
                    </span>
                  )}
                {registrationForm.touched.confirmPassword && !registrationForm.errors.confirmPassword && registrationForm.values.confirmPassword && (
                  <span className={styles.successMessage}>Passwords match</span>
                )}
              </div>

              <div className={styles.formActions}>
                <Button
                  type="submit"
                  disabled={!registrationForm.isValid || registrationForm.isSubmitting}
                  loading={registrationForm.isSubmitting}
                >
                  {registrationForm.isSubmitting ? 'Criando conta...' : 'Criar Conta'}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>

      <section className={styles.infoSection}>
        <Card title="💡 Recursos de Validação">
          <ul>
            <li>✅ Validação em tempo real após o campo ser tocado</li>
            <li>✅ Mensagens de erro específicas para cada campo com ícones</li>
            <li>✅ Mensagens de sucesso para campos válidos</li>
            <li>✅ Botão de submit desabilitado quando formulário é inválido</li>
            <li>✅ Estado de loading durante submissão</li>
            <li>✅ Feedback visual com bordas coloridas (vermelho para erro, verde para sucesso)</li>
            <li>✅ Animações suaves para transições de estado</li>
            <li>✅ Indicadores visuais de erro com shake animation</li>
            <li>✅ Validações customizadas usando funções utilitárias</li>
            <li>✅ Acessibilidade com ARIA attributes</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}

export default Forms;
