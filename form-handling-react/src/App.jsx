import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

function App() {
  return (
    <div>
      <h1>React Form Handling</h1>
      <h2>Controlled Components</h2>
      <RegistrationForm />
      <h2>Formik Form</h2>
      <FormikForm />
    </div>
  );
}

export default App;
