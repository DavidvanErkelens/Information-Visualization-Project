<?php
/**
 *  Init.php
 *
 *  Script to intialize the backend
 *
 *  Including this file will make sure that all PHP-classes existing in this directory
 *  or subdirectories are automatically loaded, as long as the filename is equal to the
 *  class name.
 */

/**
 *  Autoload function
 *  @param      string
 */
function autoloadClass($className)
{
    // Create array for classes
    $classes = array();

    // Load existing links to classes (if exists)
    if (file_exists(__DIR__.'/classes'))
    {
        // Unserialize classes array
        $classes = unserialize(file_get_contents(__DIR__.'/classes'));

        // Have we already seen this class?
        if(array_key_exists($className, $classes))
        {
            // Get filename that contains the class
            $file = $classes[$className];

            // Does the file still exist?
            if (file_exists($file)) 
            {
                // Include the file - we're done
                include($file); return;
            }

            // File does not exist anymore, unset key
            unset($classes[$className]);
        }
    }

    // Check if we can find a file with the classname in the current folder
    if ($result = classExistsInFolder($className, new DirectoryIterator(__DIR__)))
    {
        // We found the class, store it
        $classes[$className] = $result;

        // Cache classes array for faster lookup
        file_put_contents(__DIR__.'/classes', serialize($classes));
    }
}

/**
 *  Helper function to recursively check if a class exists in a certain folder
 */
function classExistsInFolder($className, DirectoryIterator $iterator)
{
    // Loop over all entries in this directory
    foreach ($iterator as $fileinfo)
    {
        // Skip dots
        if ($fileinfo->isDot()) continue;

        // If we have a directory, check if the class exists in there
        if ($fileinfo->isDir())
        {
            // Recursion
            if ($filePath = classExistsInFolder($className, new DirectoryIterator($fileinfo->getPathname()))) return $filePath;
        }   

        // Is the entry a file?
        if ($fileinfo->isFile())
        {
            // Check if the filename matches our classname
            if ($fileinfo->getFileName() == $className . '.php')
            {
                // Include the file
                include($filePath = $fileinfo->getPathname());

                // Return the path to the file
                return $filePath;
            }
        }
    }

    // Class was not found
    return false;
}

// Register autoloader
spl_autoload_register('autoloadClass');
