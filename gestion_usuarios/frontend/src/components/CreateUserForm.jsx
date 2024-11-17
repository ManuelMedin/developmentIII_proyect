import { useForm } from 'react-hook-form';
import { createUser } from '../api/user.api';
import { toast } from "react-hot-toast";

const CreateUserForm = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await createUser(data);
            toast.success("Usuario creado");

            console.log("Respuesta del servidor:", res);
            onClose();
        } catch (error) {
            console.error("Error al crear el usuario:", error.response?.data || error.message);
        }
    });

    return (
        <div className="card shadow-sm p-4">
            <h1 className="card-title text-center mb-4">Crear usuario</h1>
            <form className="form-group" onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Nombre"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <div className="text-danger">Requerido</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="cc_user" className="form-label">CC</label>
                    <input
                        type="text"
                        id="cc_user"
                        className="form-control"
                        placeholder="Número de identificación"
                        {...register("cc_user", { required: true })}
                    />
                    {errors.cc_user && <div className="text-danger">Requerido</div>}

                </div>

                <div className="mb-3">
                    <label htmlFor="user_type" className="form-label">Rol</label>
                    <select
                        id="user_type"
                        className="form-control"
                        {...register("user_type", { required: true })}
                    >
                        <option value="">Selecciona un rol</option>
                        <option value="doctor">Doctor</option>
                        <option value="paciente">Paciente</option>
                    </select>
                    {errors.user_type && <div className="text-danger">Requerido</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="nombre@gmail.com"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <div className="text-danger">Requerido</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Número</label>
                    <input
                        type="text"
                        id="phone"
                        className="form-control"
                        placeholder="Número"
                        {...register("phone", { required: true })}
                    />
                    {errors.phone && <div className="text-danger">Requerido</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="date_of_birth" className="form-label">Fecha de nacimiento</label>
                    <input
                        type="date"
                        id="date_of_birth"
                        className="form-control"
                        {...register("date_of_birth", { required: true })}
                    />
                    {errors.date_of_birth && <div className="text-danger">Requerido</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <div className="text-danger">Requerido</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">Crear</button>
            </form>

            <button className="btn btn-secondary w-100 mt-3" onClick={onClose}>Cancelar</button>
        </div>
    );
};

export default CreateUserForm;
