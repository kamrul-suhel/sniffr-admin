<?php

namespace App\Traits;

trait Slug
{
    /**
     * @var string $type
     *
     * @Column(name="slug", type="text", nullable=false)
     */
    private $slug;

    public function setSlug( $name )
    {
        $this->slug = $this->slugify($name);
        return $this;
    }

    public function getSlug()
    {
        return $this->slug;
    }

    public function slugify($name){
        // lowercase
        $name = strtolower($name);

        // Remove apostrophes
        $name = str_replace('\'', '', $name);

        // replace non letter or digits by -
        $name = preg_replace('~[^\\pL\d]+~u', '-', $name);

        // trim
        $name = trim($name, '-');

        // remove unwanted characters
        $name = preg_replace('~[^-\w]+~', '', $name);

        // transliterate
        $name = iconv('utf-8', 'us-ascii//TRANSLIT', $name);

        if (empty($name))
        {
            return 'n-a';
        }

        return $name;
    }
}