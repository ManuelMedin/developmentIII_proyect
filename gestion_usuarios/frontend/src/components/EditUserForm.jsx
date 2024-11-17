import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { getUser, updateUser } from '../api/user.api';
import { toast } from 'react-hot-toast';

const EditUserForm = ({ userId, onClose }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // Cargar los datos del usuario para editar
    useEffect(() => {
        async function loadUserData() {
            try {
                const res = await getUser(userId);
                const userData = res.data;
                // Establecer los valores en el formulario
                setValue("name", userData.name);
                setValue("cc_user", userData.cc_user);
                setValue("user_type", userData.user_type);
                setValue("email", userData.email);
                setValue("phone", userData.phone);
                setValue("date_of_birth", userData.date_of_birth);
                setValue("password", userData.password || ""); // Aquí no dejar vacío el campo de contraseña
            } catch (error) {
                console.error('Error cargando el usuario:', error.response ? error.response.data : error.message);
            }
        }
        loadUserData();
    }, [userId, setValue]);

    // Enviar los datos del formulario para actualizar el usuario
    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await updateUser(userId, data);
            toast.success("Usuario actualizado");
            console.log("Respuesta del servidor:", res);
            onClose(); // Cerrar el formulario después de la actualización
        } catch (error) {
            console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
            toast.error('Hubo un error al actualizar el usuario.');
        }
    });

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <h3>Editar Usuario</h3>
                        <form onSubmit={onSubmit} className="form-group">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    placeholder="Nombre"
                                    {...register("name", { required: "Este campo es obligatorio" })}
                                />
                                {errors.name && <div className="text-danger">{errors.name.message}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cc_user" className="form-label">CC</label>
                                <input 
                                    type="text"
                                    id="cc_user"
                                    className="form-control"
                                    placeholder="Número de identificación"
                                    {...register("cc_user", { required: "Este campo es obligatorio" })}
                                />
                                 {errors.cc_user && <div className="text-danger">{errors.cc_user.message}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="user_type" className="form-label">Rol</label>
                                <select
                                    id="user_type"
                                    className="form-control"
                                    {...register("user_type", { required: "Este campo es obligatorio" })}
                                >
                                    <option value="doctor">Doctor</option>
                                    <option value="paciente">Paciente</option>
                                </select>
                                {errors.user_type && <div className="text-danger">{errors.user_type.message}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="nombre@gmail.com"
                                    {...register("email", { required: "Este campo es obligatorio" })}
                                />
                                {errors.email && <div className="text-danger">{errors.email.message}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Número de Teléfono</label>
                                <input
                                    type="text"
                                    id="phone"
                                    className="form-control"
                                    placeholder="Número"
                                    {...register("phone", { required: "Este campo es obligatorio" })}
                                />
                                {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="date_of_birth" className="form-label">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    id="date_of_birth"
                                    className="form-control"
                                    {...register("date_of_birth", { required: "Este campo es obligatorio" })}
                                />
                                {errors.date_of_birth && <div className="text-danger">{errors.date_of_birth.message}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    {...register("password")}
                                />
                            </div>

                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary">Actualizar</button>
                                <button type="button" onClick={onClose} className="btn btn-secondary">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserForm;
