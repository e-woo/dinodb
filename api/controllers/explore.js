import { db } from "../db.js";

export const search = (req, res) => {
    const { searchTerm, searchFilters } = req.body;
    let combinedResults = [];

    const executeQuery = (query, params, callback) => {
        db.query(query, params, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    };

    const processFilter = (filterIndex) => {
        if (filterIndex >= searchFilters.length) {
            res.status(200).json(combinedResults);
            return;
        }

        let query;
        switch (searchFilters[filterIndex]) {

            case 'Club':
                query = `SELECT DISTINCT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path, EA.Type
                        FROM EXTRACURRICULAR_ACTIVITY AS EA 
                        NATURAL JOIN CLUB
                        LEFT JOIN CATEGORIZED_BY AS CB ON EA.Activity_ID = CB.Activity_ID
                        LEFT JOIN TAG AS T ON CB.Tag_ID = T.Tag_ID
                        WHERE EA.Name LIKE ?
                        OR T.Tag_Name LIKE ?;`;
                break;
            case 'Volunteer':
                query = `SELECT DISTINCT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path, EA.Type
                        FROM EXTRACURRICULAR_ACTIVITY AS EA 
                        NATURAL JOIN VOLUNTEERING_OPPORTUNITY
                        LEFT JOIN CATEGORIZED_BY AS CB ON EA.Activity_ID = CB.Activity_ID
                        LEFT JOIN TAG AS T ON CB.Tag_ID = T.Tag_ID
                        WHERE EA.Name LIKE ?
                        OR T.Tag_Name LIKE ?;`;
                break;
            case 'Program':
                query = `SELECT DISTINCT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path, EA.Type
                        FROM EXTRACURRICULAR_ACTIVITY AS EA 
                        NATURAL JOIN PROGRAM
                        LEFT JOIN CATEGORIZED_BY AS CB ON EA.Activity_ID = CB.Activity_ID
                        LEFT JOIN TAG AS T ON CB.Tag_ID = T.Tag_ID
                        WHERE EA.Name LIKE ?
                        OR T.Tag_Name LIKE ?;`;
                break;
            case 'Event':
                query = `SELECT DISTINCT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path, EA.Type
                FROM EXTRACURRICULAR_ACTIVITY AS EA 
                NATURAL JOIN EVENT
                LEFT JOIN CATEGORIZED_BY AS CB ON EA.Activity_ID = CB.Activity_ID
                LEFT JOIN TAG AS T ON CB.Tag_ID = T.Tag_ID
                WHERE EA.Name LIKE ?
                OR T.Tag_Name LIKE ?;`;
                break;
        }

        const params = ['%' + searchTerm + '%', '%' + searchTerm + '%'];

        executeQuery(query, params, (err, results) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            combinedResults = combinedResults.concat(results);
            processFilter(filterIndex + 1);
        });
    };

    if (!Array.isArray(searchFilters) || searchFilters.length === 0 || searchFilters.length === 4) {
        const defaultQuery = `SELECT DISTINCT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path, EA.Type
                            FROM EXTRACURRICULAR_ACTIVITY AS EA 
                            LEFT JOIN CATEGORIZED_BY AS CB ON EA.Activity_ID = CB.Activity_ID
                            LEFT JOIN TAG AS T ON CB.Tag_ID = T.Tag_ID
                            WHERE EA.Name LIKE ?
                            OR T.Tag_Name LIKE ?;`;

        const params = ['%' + searchTerm + '%', '%' + searchTerm + '%'];
        
        executeQuery(defaultQuery, params, (err, results) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(results);
                console.log(results);
            }
        });
    } else {
        processFilter(0);
    }
};
