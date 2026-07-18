# BIM3_Actividad4_Taller_CRUD_Biblioteca
  Proyecto en Typescript sobre un CRUD Básico para una Biblioteca con 3 entidades, Usuario, Libro, Editorial  cada uno con validaciones try catch y se almacenan datos en archivos JSON.
  
## Funcionalidad de las funciones

### `login(correo, contrasena)`
Busca entre los usuarios guardados uno que tenga ese correo y esa contraseña. Si lo encuentra, deja pasar al sistema; si no, avisa que las credenciales están mal.

### `register(usuario)`
Registra un usuario nuevo. Antes de guardarlo, pasa por las mismas validaciones que el resto del sistema (por ejemplo, que el correo sea de gmail, outlook o hotmail).

### `validarUsuario(usuario)`
Revisa que todos los datos del usuario estén bien antes de guardarlo: nombre y apellido con una longitud razonable, edad entre 1 y 100, correo con formato válido y de un dominio permitido, contraseña de al menos 8 caracteres, y que el rol y el estado sean valores válidos. Si algo está mal, corta el proceso y avisa qué campo falló.

### `validarLibro(libro)`
Revisa los datos del libro antes de guardarlo: que tenga título y autor, que el año de publicación tenga sentido (no sea muy antiguo ni futuro), y que el estado y la editorial sean válidos.

### `validarEditorial(editorial)`
Revisa que la editorial tenga nombre, país y un tipo válido antes de guardarla.

### `LibroService.agregar(libro)`
Registra un libro nuevo. Antes de guardarlo valida sus datos, se fija que la editorial que se le puso realmente exista, y que no haya ya otro libro con el mismo ID.

### `menuCruds()`
Es el menú que aparece después de iniciar sesión. Desde ahí se puede elegir entre gestionar usuarios, libros o editoriales.
