<template>
    <div class="col-sm-6 p-0 m-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <!-- MODAL -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <i class="fa-solid fa-backward fa-2xl"></i> <br>
                            History 
                            
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Date (mm/dd/yy)</th>
                                <th scope="col">Symptoms Inputted</th>
                                <th scope="col">Doctor Preferences</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>
                                    1. 10/03/21 
                                    <button> Download Doctors Version </button>
                                </td>
                                <td>
                                    1. Chest pain <br>
                                    2. Abdominal pain <br>

                                    Recommended Specialization: <strong>Gastroenterology</strong>
                                </td>
                                <td>
                                    Sex: Female <br>
                                    Age Range: No preference <br>
                                    Location: Manila City <br>
                                    Price: Less than PHP 500.00 <br>
                                    Years in Practice: 20 or more years of experience
                                </td>
                                </tr>
                                <tr>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <td>Larry the Bird</td>
                                <td>Bloblo</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL -->
        <div class="col-card card me-2 ml-2">
            <div class="icon">
                <i class="fa-solid fa-backward fa-2xl"></i>
            </div>
            <div class="info card-body">
                <h5 class="card-title">History</h5>
                <p class="card-text">
                <small class="text-muted">
                    Previous Find Me a Doctor history within the application will be
                    displayed here.
                </small>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-body{
    background-color: rgb(191, 183, 236);
}

</style>